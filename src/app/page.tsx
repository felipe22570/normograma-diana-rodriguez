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

	const [decretosFilters, setDecretosFilters] = useState<FilterParams>({
		year: "Todos los años",
		type: "DECRETO",
		search: "",
	});

	const [resolucionesFilters, setResolucionesFilters] = useState<FilterParams>({
		year: "Todos los años",
		type: "RESOLUCIÓN",
		search: "",
	});

	const [leyesFilters, setLeyesFilters] = useState<FilterParams>({
		year: "Todos los años",
		type: "LEY",
		search: "",
	});

	const [glossarySearch, setGlossarySearch] = useState("");

	const handleFilterChange = (newFilters: FilterParams) => {
		setFilters(newFilters);
	};

	const handleDecretosFilterChange = (newFilters: FilterParams) => {
		setDecretosFilters({ ...newFilters, type: "DECRETO" });
	};

	const handleResolucionesFilterChange = (newFilters: FilterParams) => {
		setResolucionesFilters({ ...newFilters, type: "RESOLUCIÓN" });
	};

	const handleLeyesFilterChange = (newFilters: FilterParams) => {
		setLeyesFilters({ ...newFilters, type: "LEY" });
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
							<TabsList className="grid w-[800px] grid-cols-5 h-12 bg-gray-100 border border-gray-200">
								<TabsTrigger
									value="norms"
									className="cursor-pointer text-sm font-medium h-10 w-full data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 hover:bg-blue-50"
								>
									Ver Normas
								</TabsTrigger>
								<TabsTrigger
									value="decretos"
									className="cursor-pointer text-sm font-medium h-10 w-full data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 hover:bg-purple-50"
								>
									Ver Decretos
								</TabsTrigger>
								<TabsTrigger
									value="resoluciones"
									className="cursor-pointer text-sm font-medium h-10 w-full data-[state=active]:bg-sky-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 hover:bg-sky-50"
								>
									Ver Resoluciones
								</TabsTrigger>
								<TabsTrigger
									value="leyes"
									className="cursor-pointer text-sm font-medium h-10 w-full data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 hover:bg-green-50"
								>
									Ver Leyes
								</TabsTrigger>
								<TabsTrigger
									value="glossary"
									className="cursor-pointer text-sm font-medium h-10 w-full data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 hover:bg-orange-50"
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

						<TabsContent value="decretos" className="space-y-6">
							<div className="text-center mb-6">
								<h2 className="text-2xl font-bold text-purple-700">Decretos</h2>
								<p className="text-gray-600">
									Visualización de todos los decretos en el sistema
								</p>
							</div>
							<div className="px-28">
								<FilterForm
									onFilterChange={handleDecretosFilterChange}
									hideTypeFilter={true}
									initialFilters={{ type: "DECRETO" }}
								/>
							</div>
							<NormsTable filters={decretosFilters} />
						</TabsContent>

						<TabsContent value="resoluciones" className="space-y-6">
							<div className="text-center mb-6">
								<h2 className="text-2xl font-bold text-sky-600">Resoluciones</h2>
								<p className="text-gray-600">
									Visualización de todas las resoluciones en el sistema
								</p>
							</div>
							<div className="px-28">
								<FilterForm
									onFilterChange={handleResolucionesFilterChange}
									hideTypeFilter={true}
									initialFilters={{ type: "RESOLUCIÓN" }}
								/>
							</div>
							<NormsTable filters={resolucionesFilters} />
						</TabsContent>

						<TabsContent value="leyes" className="space-y-6">
							<div className="text-center mb-6">
								<h2 className="text-2xl font-bold text-green-700">Leyes</h2>
								<p className="text-gray-600">
									Visualización de todas las leyes en el sistema
								</p>
							</div>
							<div className="px-28">
								<FilterForm
									onFilterChange={handleLeyesFilterChange}
									hideTypeFilter={true}
									initialFilters={{ type: "LEY" }}
								/>
							</div>
							<NormsTable filters={leyesFilters} />
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
