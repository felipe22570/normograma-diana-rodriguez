"use server";

import db from "@/db";
import { norms, glossary } from "@/db/schema";
import { eq } from "drizzle-orm";

export type Norm = typeof norms.$inferSelect;
export type NewNorm = typeof norms.$inferInsert;

export type Glossary = typeof glossary.$inferSelect;
export type NewGlossary = typeof glossary.$inferInsert;

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

export async function getGlossary() {
	try {
		const allGlossary = await db.select().from(glossary);
		return { data: allGlossary, error: null };
	} catch (error) {
		console.error("Error fetching glossary:", error);
		return { data: null, error: "Failed to fetch glossary" };
	}
}

export async function getGlossaryById(id: number) {
	try {
		const glossaryItem = await db.select().from(glossary).where(eq(glossary.id, id));
		if (!glossaryItem.length) {
			return { data: null, error: "Glossary item not found" };
		}
		return { data: glossaryItem[0], error: null };
	} catch (error) {
		console.error("Error fetching glossary item:", error);
		return { data: null, error: "Failed to fetch glossary item" };
	}
}

export async function insertGlossary(item: NewGlossary) {
	try {
		const [newItem] = await db.insert(glossary).values(item).returning();
		return { data: newItem, error: null };
	} catch (error) {
		console.error("Error inserting glossary item:", error);
		return { data: null, error: "Failed to insert glossary item" };
	}
}

export async function updateGlossary(id: number, item: Partial<NewGlossary>) {
	try {
		const [updatedItem] = await db
			.update(glossary)
			.set({ ...item, updated_at: new Date().toISOString() })
			.where(eq(glossary.id, id))
			.returning();
		return { data: updatedItem, error: null };
	} catch (error) {
		console.error("Error updating glossary item:", error);
		return { data: null, error: "Failed to update glossary item" };
	}
}

export async function deleteGlossary(id: number) {
	try {
		await db.delete(glossary).where(eq(glossary.id, id));
		return { data: null, error: null };
	} catch (error) {
		console.error("Error deleting glossary item:", error);
		return { data: null, error: "Failed to delete glossary item" };
	}
}
