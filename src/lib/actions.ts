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

export async function updateNorm(id: number, norm: Partial<NewNorm>) {
	try {
		const [updatedNorm] = await db
			.update(norms)
			.set({ ...norm, updated_at: new Date().toISOString() })
			.where(eq(norms.id, id))
			.returning();
		return { data: updatedNorm, error: null };
	} catch (error) {
		console.error("Error updating norm:", error);
		return { data: null, error: "Failed to update norm" };
	}
}

export async function deleteNorm(id: number) {
	try {
		await db.delete(norms).where(eq(norms.id, id));
		return { data: null, error: null };
	} catch (error) {
		console.error("Error deleting norm:", error);
		return { data: null, error: "Failed to delete norm" };
	}
}
