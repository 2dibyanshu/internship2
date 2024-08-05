import { superValidate, fail, setError } from 'sveltekit-superforms';
import { loginSchema } from "./login-schema";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad, Actions } from "./$types.js";
import { lucia } from "@/lib/server/auth/index.js";
import { verify } from "@node-rs/argon2";
import { db } from "@/lib/server/db/index.js";
import { userTable } from "@/lib/server/db/schema/user.js";
import { eq } from "drizzle-orm";
import { redirect } from "@sveltejs/kit";
import Iron from '@hapi/iron';
import { AUTH_PASSWORD } from "$env/static/private";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(loginSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(loginSchema));
    if (!form.valid) {
      return fail(400, {
        form
      });
    }
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.email, form.data.email)
    })

    if (!user) {
      // NOTE:
      // Returning immediately allows malicious actors to figure out valid emails from response times,
      // allowing them to only focus on guessing passwords in brute-force attacks.
      // As a preventive measure, you may want to hash passwords even for invalid emails.
      // However, valid emails can be already be revealed with the signup page
      // and a similar timing issue can likely be found in password reset implementation.
      // It will also be much more resource intensive.
      // Since protecting against this is non-trivial,
      // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
      // If emails/usernames are public, you may outright tell the user that the username is invalid.
      setError(form, 'email', 'Invalid email or password');
      return fail(400, {
        form
      });
    }

    const validPassword = await verify(user.password_hash, form.data.password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
    });
    if (!validPassword) {
      setError(form, 'password', 'Invalid email or password');
      return fail(400, {
        form
      });
    }

    const session = await lucia.createSession(user.id, {});

    const sealed = await Iron.seal({
      id: user.id,
      email: form.data.email,
      first_name: user.first_name,
      last_name: user.last_name,
      session_id: session.id,
      expires_at: session.expiresAt,
    }, AUTH_PASSWORD, Iron.defaults);

    const sessionCookie = lucia.createSessionCookie(sealed);

    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });

    redirect(302, "/");
  },
};