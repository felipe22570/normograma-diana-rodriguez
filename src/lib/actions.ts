"use server";

import db from "@/db";
import { norms } from "@/db/schema";
import { eq } from "drizzle-orm";

export type Norm = typeof norms.$inferSelect;
export type NewNorm = typeof norms.$inferInsert;

export async function getNorms() {
	try {
		const allNorms = await db.select().from(norms);
		return { data: allNorms, error: null };
	} catch (error) {
		console.error("Error fetching norms:", error);
		return { data: null, error: "Failed to fetch norms" };
	}
}

export async function getNormById(id: number) {
	try {
		const norm = await db.select().from(norms).where(eq(norms.id, id));
		if (!norm.length) {
			return { data: null, error: "Norm not found" };
		}
		return { data: norm[0], error: null };
	} catch (error) {
		console.error("Error fetching norm:", error);
		return { data: null, error: "Failed to fetch norm" };
	}
}

export async function insertNorm(norm: NewNorm) {
	try {
		const [newNorm] = await db.insert(norms).values(norm).returning();
		return { data: newNorm, error: null };
	} catch (error) {
		console.error("Error inserting norm:", error);
		return { data: null, error: "Failed to insert norm" };
	}
}
