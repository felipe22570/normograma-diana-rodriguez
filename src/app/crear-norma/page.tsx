"use client";

import DecreeModalWrapper from "@/components/DecreeModalWrapper";
import EditNormModal from "@/components/EditNormModal";
import AccessKeyForm from "@/components/AccessKeyForm";
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
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import Image from "next/image";
export const dynamic = "force-dynamic";

export default function CrearNorma() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
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

	const handleAccessGranted = () => {
		setIsAuthenticated(true);
	};

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

	// Show access key form if not authenticated
	if (!isAuthenticated) {
		return <AccessKeyForm onAccessGranted={handleAccessGranted} />;
	}

	const columns: ColumnDef<Norm>[] = [
		{
			accessorKey: "type",
			header: "Tipo",
			cell: ({ row }) => {
				const type = (row.getValue("type") as string).trim().toUpperCase();
				let colorClass = "";
				let backgroundClass = "";

				switch (type) {
					case "DECRETO":
						colorClass = "text-purple-700";
						backgroundClass = "bg-purple-100";
						break;
					case "LEY":
						colorClass = "text-green-700";
						backgroundClass = "bg-green-100";
						break;
					case "RESOLUCIÓN":
						colorClass = "text-sky-600";
						backgroundClass = "bg-sky-100";
						break;
					default:
						colorClass = "text-gray-900";
						backgroundClass = "bg-gray-100";
				}

				return (
					<div className="w-20">
						<span
							className={`px-3 py-2 rounded-full text-xs font-medium ${colorClass} ${backgroundClass}`}
						>
							{type}
						</span>
					</div>
				);
			},
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
			cell: ({ row }) =>
				row.getValue("description") && (
					<div className="w-40 flex items-center justify-center">
						<Popover>
							<PopoverTrigger asChild>
								<Image
									src="/description.jpg"
									alt="Info"
									width={120}
									height={120}
									className="cursor-pointer"
								/>
							</PopoverTrigger>
							<PopoverContent className="w-96 break-words whitespace-pre-line bg-gray-100 shadow-lg border border-gray-200 ">
								<p className="text-sm text-center">{row.getValue("description")}</p>
							</PopoverContent>
						</Popover>
					</div>
				),
		},
		{
			accessorKey: "authority",
			header: "Autoridad",
			cell: ({ row }) => <div className="w-42">{row.getValue("authority")}</div>,
		},
		{
			accessorKey: "observations",
			header: "Observaciones",
			cell: ({ row }) =>
				row.getValue("observations") && (
					<div className="w-20 flex items-center justify-center">
						<Popover>
							<PopoverTrigger asChild>
								<Image
									src="/observations.jpg"
									alt="Info"
									width={30}
									height={30}
									className="cursor-pointer"
								/>
							</PopoverTrigger>
							<PopoverContent className="max-w-xs break-words whitespace-pre-line bg-gray-100 shadow-lg border border-gray-200 ">
								<p className="text-sm text-center">{row.getValue("observations")}</p>
							</PopoverContent>
						</Popover>
					</div>
				),
		},
		{
			accessorKey: "comments",
			header: "Comentarios",
			cell: ({ row }) =>
				row.getValue("comments") && (
					<div className="w-20 flex items-center justify-center">
						<Popover>
							<PopoverTrigger asChild>
								<Info className="w-6 h-6 mt-[-3px] flex items-center justify-center text-red-600 hover:text-red-700 cursor-pointer" />
							</PopoverTrigger>
							<PopoverContent className="max-w-xs break-words whitespace-pre-line bg-red-50 text-red-700 shadow-lg border border-gray-200 ">
								<p className="text-sm text-center">{row.getValue("comments")}</p>
							</PopoverContent>
						</Popover>
					</div>
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
