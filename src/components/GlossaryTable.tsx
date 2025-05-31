"use client";

import { Glossary } from "@/lib/actions";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { getGlossary } from "@/lib/actions";
import { useEffect, useState } from "react";

interface GlossaryTableProps {
	searchTerm?: string;
}

export default function GlossaryTable({ searchTerm = "" }: GlossaryTableProps) {
	const [glossary, setGlossary] = useState<Glossary[]>([]);
	const [filteredGlossary, setFilteredGlossary] = useState<Glossary[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchGlossary = async () => {
			setIsLoading(true);
			try {
				const result = await getGlossary();
				if (result.error) {
					setError(result.error);
					setGlossary([]);
				} else {
					setGlossary(result.data || []);
					setError(null);
				}
			} catch {
				setError("Error al cargar el glosario");
				setGlossary([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchGlossary();
	}, []);

	// Filter glossary based on search term
	useEffect(() => {
		const filtered = glossary.filter((item) => {
			const searchTermLower = searchTerm.toLowerCase();
			return (
				item.name.toLowerCase().includes(searchTermLower) ||
				item.definition.toLowerCase().includes(searchTermLower) ||
				(item.source && item.source.toLowerCase().includes(searchTermLower))
			);
		});

		// Sort alphabetically by name - create new array to avoid mutation issues
		const sorted = [...filtered].sort((a, b) => {
			const nameA = a.name.toLowerCase().trim();
			const nameB = b.name.toLowerCase().trim();
			return nameA.localeCompare(nameB);
		});

		setFilteredGlossary(sorted);
	}, [glossary, searchTerm]);

	const columns: ColumnDef<Glossary>[] = [
		{
			accessorKey: "name",
			header: "Término",
			cell: ({ row }) => <div className="w-72 font-medium">{row.getValue("name")}</div>,
		},
		{
			accessorKey: "definition",
			header: "Definición",
			cell: ({ row }) => <div className="max-w-[600px]">{row.getValue("definition")}</div>,
		},
		{
			accessorKey: "source",
			header: "Fuente",
			cell: ({ row }) => <div className="w-32">{row.getValue("source") || "—"}</div>,
		},
	];

	const TableSkeleton = () => (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Término</TableHead>
						<TableHead>Definición</TableHead>
						<TableHead>Fuente</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{[...Array(5)].map((_, index) => (
						<TableRow key={index}>
							<TableCell>
								<Skeleton className="h-4 w-40" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-[400px]" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-32" />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);

	if (error) {
		return <div className="text-center text-red-500">{error}</div>;
	}

	if (isLoading) {
		return <TableSkeleton />;
	}

	if (filteredGlossary.length === 0) {
		return (
			<div className="text-center py-4">
				{searchTerm
					? "No se encontraron términos que coincidan con la búsqueda"
					: "No hay términos en el glosario"}
			</div>
		);
	}

	return <DataTable columns={columns} data={filteredGlossary} />;
}
