"use client";

import { useEffect, useRef } from "react";

interface DecreeFormData {
	name: string;
	year: number;
	description: string;
	observations?: string;
	url?: string;
}

interface DecreeModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: DecreeFormData) => void;
}

export default function DecreeModal({ isOpen, onClose, onSubmit }: DecreeModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && event.target === modalRef.current) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const decreeData: DecreeFormData = {
			name: formData.get("name") as string,
			year: Number(formData.get("year")),
			description: formData.get("description") as string,
			observations: formData.get("observations") as string,
			url: formData.get("url") as string,
		};
		onSubmit(decreeData);
		e.currentTarget.reset();
	};

	if (!isOpen) return null;

	return (
		<div
			ref={modalRef}
			className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
		>
			<div className="relative top-10 mx-auto p-5 max-h-[90vh] overflow-y-auto border w-[600px] shadow-lg rounded-md bg-white">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-medium">Crear Nueva Norma</h3>
					<button onClick={onClose} className="text-gray-400 hover:text-gray-500">
						<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="type" className="block text-sm font-medium text-gray-700">
							Tipo
						</label>
						<input
							type="text"
							id="type"
							name="type"
							required
							className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label htmlFor="name" className="block text-sm font-medium text-gray-700">
							Nombre
						</label>
						<input
							type="text"
							id="name"
							name="name"
							required
							className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label htmlFor="date" className="block text-sm font-medium text-gray-700">
							Fecha de emisión
						</label>
						<input
							type="date"
							id="date"
							name="date"
							required
							className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label
							htmlFor="description"
							className="block text-sm font-medium text-gray-700"
						>
							Descripción
						</label>
						<textarea
							id="description"
							name="description"
							rows={3}
							required
							className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label
							htmlFor="observations"
							className="block text-sm font-medium text-gray-700"
						>
							Observaciones
						</label>
						<textarea
							id="observations"
							name="observations"
							rows={3}
							className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label htmlFor="authority" className="block text-sm font-medium text-gray-700">
							Autoridad que emite la norma
						</label>
						<input
							type="text"
							id="authority"
							name="authority"
							className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label htmlFor="comments" className="block text-sm font-medium text-gray-700">
							Comentarios
						</label>
						<textarea
							id="comments"
							name="comments"
							rows={3}
							className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label htmlFor="url" className="block text-sm font-medium text-gray-700">
							URL
						</label>
						<input
							type="url"
							id="url"
							name="url"
							className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>
					<div className="flex justify-end space-x-3">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
						>
							Cancelar
						</button>
						<button
							type="submit"
							className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md"
						>
							Crear Norma
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
