import { db } from "@/lib/server/db";
import type { PageServerLoad } from "./$types";
import { eq } from "drizzle-orm";
import { workspaceMemberTable } from "@/lib/server/db/schema";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    if(!event.locals.user) {
        redirect(307,'/')
    }
    
    const workspaces = db.query.workspaceMemberTable.findMany({
        where: eq(workspaceMemberTable.userId,event.locals.user.id),
        with: {
            workspace: true,
        }
    });

    return {
       workspaces: workspaces
    }  
};