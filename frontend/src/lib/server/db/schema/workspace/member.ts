import { primaryKey, text } from "drizzle-orm/sqlite-core";
import { createTable } from "../../helpers/create-table";
import { workspaceTable } from "./workspace";
import { userTable } from "../user";
import { relations } from "drizzle-orm";

export const invitedUserListTable = createTable("invited_users_list", {
    email: text('email'),
    role: text('role',{enum: ['admin','member','guest']}).notNull().default('member'),
    status: text('status', {enum: ['pending','accepted','rejected']}).notNull().default('pending'),
    invitedBy: text('invited_by').notNull().references(() => userTable.id),
    workspaceId: text('workspace_id').notNull().references(() => workspaceTable.id),
})

export const invitedUserListRelation = relations(invitedUserListTable, ({ one }) => ({
    invitedBy: one(userTable, {
        fields: [invitedUserListTable.invitedBy],
        references: [userTable.id]
    }),
    workspace: one(workspaceTable, {
        fields: [invitedUserListTable.workspaceId],
        references: [workspaceTable.id]
    })
}));

export const workspaceMemberTable = createTable("workspace_member", {
    role: text('role',{enum: ['admin','member','guest']}).notNull().default('member'),
    workspaceId: text('workspace_id').notNull().references(() => workspaceTable.id),
    userId: text('user_id').notNull().references(() => userTable.id),
},(table) => {
    return {
        pk: primaryKey({ columns: [table.workspaceId, table.userId] }),
    }
});

export const workspaceMemberRelation = relations(workspaceMemberTable, ({ one }) => ({
    user: one(userTable, {
        fields: [workspaceMemberTable.userId],
        references: [userTable.id]
    }),
    workspace: one(workspaceTable, {
        fields: [workspaceMemberTable.workspaceId],
        references: [workspaceTable.id]
    })
}));