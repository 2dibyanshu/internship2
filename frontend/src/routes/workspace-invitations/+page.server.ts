import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { db } from "@/lib/server/db";
import { and, eq } from "drizzle-orm";
import { invitedUserListTable, workspaceMemberTable } from "@/lib/server/db/schema";
import { workspaceInvitationSchema } from "./invitation-form-schema";
import { zod } from "sveltekit-superforms/adapters";
import { fail, superValidate } from "sveltekit-superforms";

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user)
        redirect(307, '/')
    const invitations = db.query.invitedUserListTable.findMany({
        where: and(eq(invitedUserListTable.email, event.locals.user.email), eq(invitedUserListTable.status, "pending")),
        with: {
            invitedBy: true,
            workspace: true
        },
    })

    return {
        invitations,
        form: await superValidate(zod(workspaceInvitationSchema))
    }
}

export const actions: Actions = {
    default: async (event) => {

        if (!event.locals.user)
            redirect(307, '/')
        
        const form = await superValidate(event, zod(workspaceInvitationSchema))

        if (!form.valid) {
            return fail(400, {
                form
            });
        }

        if (form.data.status === 'accept') {
            await db.update(invitedUserListTable).set({
                status: 'accepted'
            }).where(and(eq(invitedUserListTable.email, event.locals.user.email), eq(invitedUserListTable.status, "pending")))
            await db.insert(workspaceMemberTable).values({
                userId: event.locals.user.id,
                workspaceId: form.data.workspace_id,
            })
        }

        if (form.data.status === 'reject') {
            await db.update(invitedUserListTable).set({
                status: 'rejected'
            }).where(and(eq(invitedUserListTable.email, event.locals.user.email), eq(invitedUserListTable.status, "pending")))
        }
        return {
            form
        }
    }
}
