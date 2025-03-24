import DecreeModalWrapper from "@/components/DecreeModalWrapper";

export default function CrearNorma() {
	return (
		<main className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Normas</h1>
				<DecreeModalWrapper />
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border border-gray-300">
					<thead>
						<tr className="bg-gray-100">
							<th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Tipo
							</th>
							<th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Nombre
							</th>
							<th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Año
							</th>
							<th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Descripción
							</th>
							<th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Acciones
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-300">
						{/* Dummy data for now */}
						<tr>
							<td className="px-6 py-4 whitespace-nowrap">Decreto</td>
							<td className="px-6 py-4 whitespace-nowrap">123</td>
							<td className="px-6 py-4 whitespace-nowrap">2024</td>
							<td className="px-6 py-4">Descripción de ejemplo del decreto</td>
							<td className="px-6 py-4 whitespace-nowrap">
								<button className="text-blue-500 hover:text-blue-700 mr-2">
									Editar
								</button>
								<button className="text-red-500 hover:text-red-700">Eliminar</button>
							</td>
						</tr>
						<tr>
							<td className="px-6 py-4 whitespace-nowrap">Decreto</td>
							<td className="px-6 py-4 whitespace-nowrap">456</td>
							<td className="px-6 py-4 whitespace-nowrap">2023</td>
							<td className="px-6 py-4">Otro decreto de ejemplo</td>
							<td className="px-6 py-4 whitespace-nowrap">
								<button className="text-blue-500 hover:text-blue-700 mr-2">
									Editar
								</button>
								<button className="text-red-500 hover:text-red-700">Eliminar</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</main>
	);
}
