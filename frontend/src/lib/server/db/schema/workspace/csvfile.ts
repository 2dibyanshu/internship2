import { blob, text } from "drizzle-orm/sqlite-core";
import { createTable } from "../../helpers/create-table";
import { id } from "../../helpers/get-id";
import { createdAt } from "../../helpers/created-at";
import { relations } from "drizzle-orm";
import { workspaceTable } from "./workspace";

// for now this can be ensured by the frontend
export const csvFileTable = createTable("csv_file", {
    id,
    name: text('name').notNull(),
    file: blob('file').notNull(),
    size: text('size').notNull(),
    workspaceId: text('workspace_id').notNull().references(() => workspaceTable.id),
    createdAt
});

export const csvFileRelation = relations(csvFileTable, ({ one }) => ({
    workspace: one(workspaceTable, {
        fields: [csvFileTable.workspaceId],
        references: [workspaceTable.id],
    })
}));
