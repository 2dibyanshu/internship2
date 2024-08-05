import { text } from "drizzle-orm/sqlite-core";
import { createTable } from "../../helpers/create-table";
import { id } from "../../helpers/get-id";
import { createdAt } from "../../helpers/created-at";
import { relations } from "drizzle-orm";
import { userTable } from "../user";
import { workspaceMemberTable } from "./member";

// for now this can be ensured by the frontend
export const workspaceTable = createTable("workspace", {
    id,
    name: text('name').notNull(),
    description: text('description'),
    ownerId: text('owner_id').notNull().references(() => userTable.id),
    createdAt
});

export const workspaceRelation = relations(workspaceTable, ({ one, many }) => ({
    owner: one(userTable,{
        fields: [workspaceTable.ownerId],
        references: [userTable.id]
    }),
    members: many(workspaceMemberTable)
}));
