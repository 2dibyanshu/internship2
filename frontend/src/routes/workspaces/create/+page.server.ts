import { superValidate, fail } from 'sveltekit-superforms';
import { createWorkspaceSchema } from "./create-workspace-schema";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad, Actions } from "./$types.js";
import { db } from '@/lib/server/db';
import { workspaceMemberTable, workspaceTable } from '@/lib/server/db/schema';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(createWorkspaceSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    if(!event.locals.user) {
      redirect(307,'/')
    }
    const form = await superValidate(event, zod(createWorkspaceSchema));
    if (!form.valid) {
      return fail(400, {
        form
      });
    }
    let res;
    try {
      res = await db.insert(workspaceTable).values({
        name: form.data.name,
        description: form.data.description,
        ownerId: event.locals.user.id,
      }).returning()
      await db.insert(workspaceMemberTable).values({
        userId: event.locals.user.id,
        workspaceId: res[0].id,
        role: 'admin',
      })
    } catch (err) {
      console.log(err);
      // setError(form, error)
      return fail(400, {
        form,
      });
    }
    redirect(307,`/workspaces/${res[0].id}`)
    return {
      form
    }
  }
};