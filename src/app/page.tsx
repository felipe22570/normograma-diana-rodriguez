"use client";

import { useState } from "react";
import Header from "@/components/Header";
import FilterForm from "@/components/FilterForm";
// import NormsList from "@/components/NormsList";
import NormsTable from "@/components/NormsTable";
import type { FilterParams } from "./actions";

export default function Home() {
	const [filters, setFilters] = useState<FilterParams>({
		year: "Todos los años",
		type: "Todos los tipos",
		search: "",
	});

	const handleFilterChange = (newFilters: FilterParams) => {
		setFilters(newFilters);
	};

	return (
		<main>
			<Header />
			<div className="container mx-auto">
				<div className="px-28 py-12">
					<FilterForm onFilterChange={handleFilterChange} />
				</div>
				<div className="px-10 pb-10">
					<NormsTable filters={filters} />
					{/* <div className="mt-8">
						<NormsList filters={filters} />
					</div> */}
				</div>
			</div>
		</main>
	);
}
