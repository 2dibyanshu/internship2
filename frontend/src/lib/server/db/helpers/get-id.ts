import { text } from "drizzle-orm/sqlite-core";
import { generateId } from "lucia";

export const id = text("id").primaryKey().$defaultFn(() => generateId(10));