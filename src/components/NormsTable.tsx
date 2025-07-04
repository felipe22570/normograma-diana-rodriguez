"use client";

import { Norm } from "@/lib/actions";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterParams, getNorms } from "@/app/actions";
import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Image from "next/image";

interface NormsTableProps {
	filters: FilterParams;
}

export default function NormsTable({ filters }: NormsTableProps) {
	const [norms, setNorms] = useState<Norm[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchNorms = async () => {
			setIsLoading(true);
			try {
				const result = await getNorms(filters);
				if ("error" in result) {
					setError(result.error || "Error desconocido");
					setNorms([]);
				} else {
					setNorms(result.norms);
					setError(null);
				}
			} catch {
				setError("Error al cargar las normas");
				setNorms([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchNorms();
	}, [filters]);

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
									width={100}
									height={100}
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
						<TableHead>URL</TableHead>
						<TableHead>Observaciones</TableHead>
						<TableHead>Comentarios</TableHead>
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
								<Skeleton className="h-4 w-24" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-32" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-200" />
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

	if (norms.length === 0) {
		return (
			<div className="text-center py-4">No se encontraron normas con los filtros seleccionados</div>
		);
	}

	return <DataTable columns={columns} data={norms} />;
}
