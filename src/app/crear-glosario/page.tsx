"use client";

import GlossaryModalWrapper from "@/components/GlossaryModalWrapper";
import GlossaryModal from "@/components/GlossaryModal";
import { getGlossary, deleteGlossary, updateGlossary } from "@/lib/actions";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Glossary } from "@/lib/actions";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const dynamic = "force-dynamic";

export default function CrearGlosario() {
	const [glossary, setGlossary] = useState<Glossary[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [selectedItem, setSelectedItem] = useState<Glossary | null>(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const fetchGlossary = async () => {
		try {
			const { data, error } = await getGlossary();
			if (error) {
				setError(error);
			} else {
				setGlossary(data || []);
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchGlossary();
	}, []);

	const handleDelete = async (id: number) => {
		if (!confirm("¿Está seguro de que desea eliminar este término?")) {
			return;
		}

		const { error } = await deleteGlossary(id);
		if (error) {
			toast.error(error);
		} else {
			toast.success("Término eliminado correctamente");
			setGlossary(glossary.filter((item) => item.id !== id));
		}
	};

	const handleEdit = (item: Glossary) => {
		setSelectedItem(item);
		setIsEditModalOpen(true);
	};

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
			cell: ({ row }) => <div className="w-32">{row.getValue("source")}</div>,
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const item = row.original;
				return (
					<div className="flex items-center gap-2">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => handleEdit(item)}
							className="h-8 w-8 p-0"
						>
							<Pencil className="h-4 w-4" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => handleDelete(item.id)}
							className="h-8 w-8 p-0"
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				);
			},
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
						<TableHead>Acciones</TableHead>
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
							<TableCell>
								<Skeleton className="h-8 w-16" />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);

	return (
		<main className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Glosario</h1>
				<GlossaryModalWrapper onSuccess={fetchGlossary} />
			</div>

			{error ? (
				<div className="text-center text-red-500">{error}</div>
			) : isLoading ? (
				<TableSkeleton />
			) : (
				<DataTable columns={columns} data={glossary} />
			)}

			{selectedItem && (
				<GlossaryModal
					isOpen={isEditModalOpen}
					onClose={() => {
						setIsEditModalOpen(false);
						setSelectedItem(null);
					}}
					onSubmit={async (data) => {
						const { error } = await updateGlossary(selectedItem.id, data);
						if (error) {
							toast.error(error);
						} else {
							toast.success("Término actualizado correctamente");
							fetchGlossary();
							setIsEditModalOpen(false);
							setSelectedItem(null);
						}
					}}
					initialData={{
						name: selectedItem.name,
						definition: selectedItem.definition,
						source: selectedItem.source || undefined,
					}}
				/>
			)}
		</main>
	);
}
