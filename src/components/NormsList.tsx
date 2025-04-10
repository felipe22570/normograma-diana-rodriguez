"use client";

import { useEffect, useState } from "react";
import { getNorms, FilterParams } from "@/app/actions";

interface Norm {
	id: number;
	name: string;
	type: string;
	emission_date: string;
	description: string | null;
	observations: string | null;
	authority: string | null;
	url: string | null;
}

interface NormsListProps {
	filters: FilterParams;
}

export default function NormsList({ filters }: NormsListProps) {
	const [norms, setNorms] = useState<Norm[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchNorms() {
			setLoading(true);
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
			}
			setLoading(false);
		}

		fetchNorms();
	}, [filters]);

	if (loading) {
		return <div className="text-center py-4">Cargando...</div>;
	}

	if (error) {
		return <div className="text-red-500 text-center py-4">{error}</div>;
	}

	if (norms.length === 0) {
		return (
			<div className="text-center py-4">No se encontraron normas con los filtros seleccionados</div>
		);
	}

	return (
		<div className="space-y-4">
			{norms.map((norm) => (
				<div key={norm.id} className="bg-white p-4 rounded-lg shadow">
					<div className="flex justify-between items-start">
						<div>
							<h3 className="text-lg font-semibold">{norm.name}</h3>
							<p className="text-sm text-gray-600">
								{norm.type} • {norm.emission_date}
							</p>
							{norm.description && (
								<p className="mt-2 text-gray-700">{norm.description}</p>
							)}
							{norm.authority && (
								<p className="mt-1 text-sm text-gray-600">
									Autoridad: {norm.authority}
								</p>
							)}
						</div>
						{norm.url && (
							<a
								href={norm.url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:text-blue-800 text-sm"
							>
								Ver documento
							</a>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
