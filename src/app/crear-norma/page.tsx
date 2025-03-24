"use client";

import DecreeModalWrapper from "@/components/DecreeModalWrapper";
import EditNormModal from "@/components/EditNormModal";
import { getNorms, deleteNorm } from "@/lib/actions";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Norm } from "@/lib/actions";
import { toast } from "sonner";

export const dynamic = "force-dynamic";

export default function CrearNorma() {
	const [norms, setNorms] = useState<Norm[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [selectedNorm, setSelectedNorm] = useState<Norm | null>(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	// Fetch norms on component mount
	useEffect(() => {
		const fetchNorms = async () => {
			const { data, error } = await getNorms();
			if (error) {
				setError(error);
			} else {
				setNorms(data || []);
			}
		};
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

	return (
		<main className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Normas</h1>
				<DecreeModalWrapper />
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border border-gray-300 text-sm">
					<thead>
						<tr className="bg-gray-100">
							<th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Tipo
							</th>
							<th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Nombre
							</th>
							<th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Fecha de emisión
							</th>
							<th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Descripción
							</th>
							<th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Autoridad
							</th>
							<th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Observaciones
							</th>
							<th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Comentarios
							</th>
							<th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								URL
							</th>
							<th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Acciones
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-300">
						{error ? (
							<tr>
								<td colSpan={9} className="px-6 py-4 text-center text-red-500">
									{error}
								</td>
							</tr>
						) : norms.length === 0 ? (
							<tr>
								<td colSpan={9} className="px-6 py-4 text-center text-gray-500">
									No hay normas registradas
								</td>
							</tr>
						) : (
							norms.map((norm) => (
								<tr key={norm.id}>
									<td className="px-6 py-4 whitespace-nowrap">{norm.type}</td>
									<td className="px-6 py-4 whitespace-nowrap">{norm.name}</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{new Date(norm.emission_date).toLocaleDateString()}
									</td>
									<td className="px-6 py-4">{norm.description}</td>
									<td className="px-6 py-4 whitespace-nowrap">{norm.authority}</td>
									<td className="px-6 py-4">{norm.observations}</td>
									<td className="px-6 py-4">{norm.comments}</td>
									<td className="px-6 py-4">
										{norm.url && (
											<a
												href={norm.url}
												className="text-blue-500 hover:text-blue-700 underline"
												target="_blank"
												rel="noopener noreferrer"
											>
												Ver documento
											</a>
										)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<button
											onClick={() => handleEdit(norm)}
											className="text-blue-500 hover:text-blue-700 mr-2 inline-flex items-center gap-1"
										>
											<Pencil size={16} />
										</button>
										<button
											onClick={() => handleDelete(norm.id)}
											className="text-red-500 hover:text-red-700 inline-flex items-center gap-1"
										>
											<Trash2 size={16} />
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{selectedNorm && (
				<EditNormModal
					norm={selectedNorm}
					isOpen={isEditModalOpen}
					onClose={() => {
						setIsEditModalOpen(false);
						setSelectedNorm(null);
					}}
				/>
			)}
		</main>
	);
}
