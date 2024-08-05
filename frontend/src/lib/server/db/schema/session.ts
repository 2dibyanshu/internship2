import { text, integer } from "drizzle-orm/sqlite-core";
import { id } from "../helpers/get-id";
import { userTable } from "./user";
import { relations } from "drizzle-orm";
import { createdAt } from "../helpers/created-at";
import { createTable } from "../helpers/create-table";

export const sessionTable = createTable("session", {
    id,
    userId: text("user_id").notNull().references(() => userTable.id, { onDelete: "cascade", onUpdate: 'cascade' }),
    expiresAt: integer("expires_at").notNull(),
    createdAt
});

export const sessionRelation = relations(sessionTable, ({ one }) => ({
    user: one(userTable, {
        fields: [sessionTable.userId],
        references: [userTable.id],
    }),
}))