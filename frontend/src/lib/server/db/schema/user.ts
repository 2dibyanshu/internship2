import { id } from "../helpers/get-id";
import { relations } from "drizzle-orm";
import { text } from "drizzle-orm/sqlite-core";
import { createdAt } from "../helpers/created-at";
import { createTable } from "../helpers/create-table";
import { sessionTable } from "./session";
import { workspaceTable } from "./workspace/workspace";
import { workspaceMemberTable } from "./workspace/member";

export const userTable = createTable("user", {
    id,
    first_name: text('given_name'),
    last_name: text('family_name'),
    email: text("email").unique().notNull(),
    password_hash: text("password_hash").notNull(),
    role: text("role", { enum: ['user', 'admin'] }).notNull().default("user"),
    invitedBy: text('invited_by'),
    createdAt
});

export const userRelation = relations(userTable, ({ one, many }) => ({
    sessions: many(sessionTable),
    invitee: one(userTable, {
        fields: [userTable.invitedBy],
        references: [userTable.id],
    }),
    workspaces: many(workspaceTable),
    member_of: many(workspaceMemberTable)
}))
