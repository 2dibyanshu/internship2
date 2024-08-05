import { superValidate, fail, setError } from 'sveltekit-superforms';
import { inviteMemberSchema } from "./invite-member";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad, Actions } from "./$types.js";
import { db } from '@/lib/server/db';
import { invitedUserListTable, workspaceMemberTable } from '@/lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(inviteMemberSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    if (!event.locals.user) {
      redirect(307, '/')
    }
    const form = await superValidate(event, zod(inviteMemberSchema));
    if (!form.valid) {
      return fail(400, {
        form
      });
    }
    try {
      const settled = await Promise.allSettled(
        [
          db.query.invitedUserListTable.findFirst({
            where: and(eq(invitedUserListTable.workspaceId, event.params.id), 
            eq(invitedUserListTable.email, form.data.email)
          ),
      }),
      db.query.workspaceMemberTable.findMany({
        where: eq(workspaceMemberTable.workspaceId, event.params.id),
        with: {
          user: true
        }
      })]);
      console.log(settled, form.data)
      if (settled[0].status === 'fulfilled' && settled[0].value !== undefined) {
        setError(form, 'email', 'User is already invited to this workspace')
        return fail(400, {
          form
        })
      }
      if (settled[1].status === 'fulfilled' && settled[1].value !== undefined) {
        const user = settled[1].value.find((member) => member.user.email === form.data.email)
        if (user) {
          setError(form, 'email', 'User is already a member of this workspace')
          return fail(400, {
            form
          })
        }
      }
      if (settled[0].status === 'rejected' || settled[1].status === 'rejected') {
        setError(form, 'email', 'Network Error, Try Again')
        return fail(400, {
          form
        })
      }
      await db.insert(invitedUserListTable).values({
        email: form.data.email,
        role: form.data.role as "member" | "admin" | "guest",
        invitedBy: event.locals.user.id,
        workspaceId: event.params.id,
        status: 'pending'
      }).returning()
    } catch (err) {
      console.log(err);
      // setError(form, error)
      return fail(400, {
        form,
      });
    }
    redirect(307, `/workspaces/${event.params.id}/members`)
  }
};