import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "@/lib/server/db";
import { and, eq } from "drizzle-orm";
import { invitedUserListTable, workspaceMemberTable } from "@/lib/server/db/schema";

export const load: PageServerLoad = async (event) => {
    if(!event.locals.user)
        redirect(307,'/');

    const invitedWorkspaceUsers = db.query.invitedUserListTable.findMany({
        where: and(eq(invitedUserListTable.workspaceId, event.params.id),eq(invitedUserListTable.status,"pending"))
    })

    const workspaceMembers = db.query.workspaceMemberTable.findMany({
        where: eq(workspaceMemberTable.workspaceId, event.params.id),
        with: {
            user: true
        }
    })
    
    return {
        invitedWorkspaceUsers,
        workspaceMembers    
    }
};