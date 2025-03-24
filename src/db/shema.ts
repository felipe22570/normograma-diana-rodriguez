import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: integer("id", { mode: "number" }).notNull().primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	type: text("type").notNull(),
	emission_date: text("emission_date").notNull(),
	description: text("description").notNull(),
	observations: text("observations").notNull(),
	authority: text("authority").notNull(),
	comments: text("comments").notNull(),
	url: text("url").notNull(),
	created_at: text("created_at")
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updated_at: text("updated_at")
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
});
