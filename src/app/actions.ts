"use server";

import { like, sql } from "drizzle-orm";
import { desc } from "drizzle-orm";
import db from "@/db";
import { norms } from "@/db/schema";

export interface FilterParams {
	year: string;
	type: string;
	search: string;
}

export interface FilterOptions {
	years: string[];
	types: string[];
}

export async function getFilterOptions(): Promise<FilterOptions> {
	try {
		// Get unique years from emission_date, ensuring we get clean 4-digit years
		const yearsResult = await db
			.select({
				year: sql<string>`DISTINCT TRIM(SUBSTR(${norms.emission_date}, 1, 4))`,
			})
			.from(norms)
			.where(sql`LENGTH(TRIM(SUBSTR(${norms.emission_date}, 1, 4))) = 4`)
			.orderBy(desc(sql`TRIM(SUBSTR(${norms.emission_date}, 1, 4))`));

		// Get unique types, ensuring they are properly trimmed and non-empty
		const typesResult = await db
			.select({
				type: sql<string>`DISTINCT TRIM(${norms.type})`,
			})
			.from(norms)
			.where(sql`TRIM(${norms.type}) != ''`)
			.orderBy(sql`TRIM(${norms.type})`);

		// Filter out any potential null values and add default options
		const validYears = yearsResult
			.map((r) => r.year)
			.filter((year): year is string => Boolean(year) && /^\d{4}$/.test(year));

		const validTypes = typesResult
			.map((r) => r.type)
			.filter((type): type is string => Boolean(type) && type.trim() !== "");

		return {
			years: ["Todos los años", ...validYears],
			types: ["Todos los tipos", ...validTypes],
		};
	} catch (error) {
		console.error("Error fetching filter options:", error);
		return {
			years: ["Todos los años"],
			types: ["Todos los tipos"],
		};
	}
}

export async function getNorms(filters: FilterParams) {
	try {
		const conditions = [];

		// Add year filter
		if (filters.year !== "Todos los años") {
			conditions.push(like(norms.emission_date, `${filters.year}%`));
		}

		// Add type filter
		if (filters.type !== "Todos los tipos") {
			conditions.push(sql`TRIM(${norms.type}) = ${filters.type.trim()}`);
		}

		// Add search filter
		if (filters.search) {
			conditions.push(
				sql`(${norms.name} LIKE ${"%" + filters.search + "%"} OR ${norms.description} LIKE ${
					"%" + filters.search + "%"
				})`
			);
		}

		// Build and execute query
		const results = await db
			.select()
			.from(norms)
			.where(conditions.length > 0 ? sql`${sql.join(conditions, sql` AND `)}` : undefined)
			.orderBy(desc(norms.emission_date));

		return { norms: results };
	} catch (error) {
		console.error("Error fetching norms:", error);
		return { error: "Failed to fetch norms" as const };
	}
}
