"use client";

import { useState } from "react";
import Header from "@/components/Header";
import FilterForm from "@/components/FilterForm";
import GlossaryFilterForm from "@/components/GlossaryFilterForm";
// import NormsList from "@/components/NormsList";
import NormsTable from "@/components/NormsTable";
import GlossaryTable from "@/components/GlossaryTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FilterParams } from "./actions";

export default function Home() {
	const [filters, setFilters] = useState<FilterParams>({
		year: "Todos los años",
		type: "Todos los tipos",
		search: "",
	});

	const [glossarySearch, setGlossarySearch] = useState("");

	const handleFilterChange = (newFilters: FilterParams) => {
		setFilters(newFilters);
	};

	const handleGlossarySearchChange = (search: string) => {
		setGlossarySearch(search);
	};

	return (
		<main>
			<Header />
			<div className="container mx-auto">
				<div className="px-10 pb-10 pt-12">
					<Tabs defaultValue="norms" className="w-full">
						<div className="flex justify-center mb-8">
							<TabsList className="grid w-[400px] grid-cols-2 h-12 bg-gray-100 border border-gray-200">
								<TabsTrigger
									value="norms"
									className="cursor-pointer text-base font-medium h-10 w-full data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 hover:bg-blue-50"
								>
									Ver Normas
								</TabsTrigger>
								<TabsTrigger
									value="glossary"
									className="cursor-pointer text-base font-medium h-10 w-full data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 hover:bg-green-50"
								>
									Ver Glosario
								</TabsTrigger>
							</TabsList>
						</div>

						<TabsContent value="norms" className="space-y-6">
							<div className="px-28">
								<FilterForm onFilterChange={handleFilterChange} />
							</div>
							<NormsTable filters={filters} />
							{/* <div className="mt-8">
								<NormsList filters={filters} />
							</div> */}
						</TabsContent>

						<TabsContent value="glossary" className="space-y-6">
							<div className="px-28">
								<GlossaryFilterForm onSearchChange={handleGlossarySearchChange} />
							</div>
							<GlossaryTable searchTerm={glossarySearch} />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</main>
	);
}
