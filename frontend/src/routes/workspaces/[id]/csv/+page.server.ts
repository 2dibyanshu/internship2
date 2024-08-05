import { db } from "@/lib/server/db";
import { csvFileTable } from "@/lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    return {
        csvfiles: db.query.csvFileTable.findMany({
            where: eq(csvFileTable.workspaceId,event.params.id),
        })
    }    
};