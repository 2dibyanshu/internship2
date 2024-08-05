import { sql } from "drizzle-orm";
import { text } from "drizzle-orm/sqlite-core";

export const createdAt = text('createdAt')
    .notNull()
    .default(sql`(current_timestamp)`);