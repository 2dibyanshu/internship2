import { superValidate, fail, withFiles } from 'sveltekit-superforms';
import { importCSVSchema } from "./import-csv.js";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad, Actions } from "./$types.js";
import { redirect } from '@sveltejs/kit';
import { db } from '@/lib/server/db/index.js';
import { csvFileTable } from '@/lib/server/db/schema/index.js';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(importCSVSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    if (!event.locals.user)
      redirect(307, '/')

    const form = await superValidate(event, zod(importCSVSchema));
    if (!form.valid) {
      return fail(400, withFiles({
        form
      }));
    }
    
    try {
      await db.insert(csvFileTable).values({
        workspaceId: event.params.id,
        file: await form.data.file.text(),
        size: `${form.data.file.size}`,
        name: form.data.name,
      });
    } catch (err) {
      console.log(err);
      // setError(form, error)
      return fail(400, withFiles({
          form
        }));
    }
    redirect(307, `/workspaces/${event.params.id}/csv`)
  }
};