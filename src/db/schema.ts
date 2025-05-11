import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const norms = sqliteTable("norms", {
	id: integer("id", { mode: "number" }).notNull().primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	type: text("type").notNull(),
	emission_date: text("emission_date").notNull(),
	description: text("description"),
	observations: text("observations"),
	authority: text("authority"),
	comments: text("comments"),
	url: text("url"),
	created_at: text("created_at")
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updated_at: text("updated_at")
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
});

export const glossary = sqliteTable("glossary", {
	id: integer("id", { mode: "number" }).notNull().primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	definition: text("definition").notNull(),
	source: text("source"),
	created_at: text("created_at")
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updated_at: text("updated_at")
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
});
