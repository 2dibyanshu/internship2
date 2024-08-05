import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { db } from "@/lib/server/db";
import { workspaceTable } from "@/lib/server/db/schema";
import { eq } from "drizzle-orm";

export const load: LayoutServerLoad = async (event) => {
    if(!event.locals.user) {
        redirect(307,'/')
    }
    const workspace = await db.query.workspaceTable.findFirst({
        where: eq(workspaceTable.ownerId,event.locals.user.id)
    })
    return {
        workspace: workspace
    }
};