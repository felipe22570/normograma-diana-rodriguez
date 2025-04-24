"use client";

import DecreeModalWrapper from "@/components/DecreeModalWrapper";
import EditNormModal from "@/components/EditNormModal";
import { getNorms, deleteNorm } from "@/lib/actions";
import { Info, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Norm } from "@/lib/actions";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const dynamic = "force-dynamic";

export default function CrearNorma() {
	const [norms, setNorms] = useState<Norm[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [selectedNorm, setSelectedNorm] = useState<Norm | null>(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const fetchNorms = async () => {
		try {
			const { data, error } = await getNorms();
			if (error) {
				setError(error);
			} else {
				setNorms(data || []);
			}
		} finally {
			setIsLoading(false);
		}
	};

	// Fetch norms on component mount
	useEffect(() => {
		fetchNorms();
	}, []);

	const handleDelete = async (id: number) => {
		if (!confirm("¿Está seguro de que desea eliminar esta norma?")) {
			return;
		}

		const { error } = await deleteNorm(id);
		if (error) {
			toast.error(error);
		} else {
			toast.success("Norma eliminada correctamente");
			setNorms(norms.filter((norm) => norm.id !== id));
		}
	};

	const handleEdit = (norm: Norm) => {
		setSelectedNorm(norm);
		setIsEditModalOpen(true);
	};

	const columns: ColumnDef<Norm>[] = [
		{
			accessorKey: "type",
			header: "Tipo",
			cell: ({ row }) => <div className="whitespace-nowrap">{row.getValue("type")}</div>,
		},
		{
			accessorKey: "name",
			header: "Nombre",
			cell: ({ row }) => <div className="w-24">{row.getValue("name")}</div>,
		},
		{
			accessorKey: "emission_date",
			header: "Fecha de emisión",
			cell: ({ row }) => (
				<div className="w-5">
					{new Date(row.getValue("emission_date") + "T00:00:00").toLocaleDateString()}
				</div>
			),
		},
		{
			accessorKey: "description",
			header: "Descripción",
			cell: ({ row }) => <div className="max-w-[320px]">{row.getValue("description")}</div>,
		},
		{
			accessorKey: "authority",
			header: "Autoridad",
			cell: ({ row }) => <div className="w-32">{row.getValue("authority")}</div>,
		},
		{
			accessorKey: "observations",
			header: "Observaciones",
			cell: ({ row }) => <div className="max-w-[200px]">{row.getValue("observations")}</div>,
		},
		{
			accessorKey: "comments",
			header: "Comentarios",
			cell: ({ row }) =>
				row.getValue("comments") && (
					<span className="max-w-[200px] inline-block rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
						<Info className="w-4 h-4 mt-[-3px] inline-block mr-1" />
						{row.getValue("comments")}
					</span>
				),
		},
		{
			accessorKey: "url",
			header: "URL",
			cell: ({ row }) => {
				const url = row.getValue("url") as string;
				return url ? (
					<a
						href={url}
						className="text-blue-500 hover:text-blue-700 underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						Ver documento
					</a>
				) : null;
			},
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const norm = row.original;
				return (
					<div className="flex items-center gap-2">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => handleEdit(norm)}
							className="h-8 w-8 p-0"
						>
							<Pencil className="h-4 w-4" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => handleDelete(norm.id)}
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
						<TableHead>Tipo</TableHead>
						<TableHead>Nombre</TableHead>
						<TableHead>Fecha de emisión</TableHead>
						<TableHead>Descripción</TableHead>
						<TableHead>Autoridad</TableHead>
						<TableHead>Observaciones</TableHead>
						<TableHead>Comentarios</TableHead>
						<TableHead>URL</TableHead>
						<TableHead>Acciones</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{[...Array(5)].map((_, index) => (
						<TableRow key={index}>
							<TableCell>
								<Skeleton className="h-4 w-20" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-40" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-32" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-[400px]" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-32" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-32" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-40" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-24" />
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
				<h1 className="text-2xl font-bold">Normas</h1>
				<DecreeModalWrapper onSuccess={fetchNorms} />
			</div>

			{error ? (
				<div className="text-center text-red-500">{error}</div>
			) : isLoading ? (
				<TableSkeleton />
			) : (
				<DataTable columns={columns} data={norms} />
			)}

			{selectedNorm && (
				<EditNormModal
					norm={selectedNorm}
					isOpen={isEditModalOpen}
					onClose={() => {
						setIsEditModalOpen(false);
						setSelectedNorm(null);
					}}
					onSuccess={fetchNorms}
				/>
			)}
		</main>
	);
}
