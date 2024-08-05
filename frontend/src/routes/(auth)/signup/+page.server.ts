import type { PageServerLoad, Actions } from "./$types.js";
import { superValidate, fail, setError } from 'sveltekit-superforms';
import { hash } from "@node-rs/argon2";
import { signupSchema } from "./signup-schema.js";
import { zod } from "sveltekit-superforms/adapters";
import { generateIdFromEntropySize } from "lucia";
import { lucia } from "@/lib/server/auth";
import { db } from "@/lib/server/db/index.js";
import { userTable } from "@/lib/server/db/schema/user.js";
import { redirect } from "@sveltejs/kit";
import Iron from '@hapi/iron';
import { AUTH_PASSWORD } from "$env/static/private";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(signupSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(signupSchema));

    if (!form.valid) {
      return fail(400, {
        form
      });
    }
    
    const passwordHash = await hash(form.data.password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
  })

    const userId = generateIdFromEntropySize(10); // 16 characters long

    try {
      await db.insert(userTable).values({
        id: userId,
        first_name: form.data.firstName,
        last_name: form.data.lastName,
        email: form.data.email,
        password_hash: passwordHash
      })

      const session = await lucia.createSession(userId, {});

      const sealed = await Iron.seal({
        id: userId,
        email: form.data.email,
        first_name: form.data.firstName,
        last_name: form.data.lastName,
        session_id: session.id,
        expires_at: session.expiresAt,
      }, AUTH_PASSWORD, Iron.defaults);

      const sessionCookie = lucia.createSessionCookie(sealed);
      
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
      });
    } catch {
      setError(form, "email", "Email already used");

      return fail(400, {
        form
      });
    }
    redirect(302, "/");
  },
};