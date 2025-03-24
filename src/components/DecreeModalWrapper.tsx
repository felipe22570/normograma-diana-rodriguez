"use client";

import { useState } from "react";
import DecreeModal from "./DecreeModal";
import { insertNorm, type NewNorm } from "@/lib/actions";
import { useRouter } from "next/navigation";

interface DecreeFormData {
	name: string;
	type: string;
	emission_date: string;
	description: string;
	observations?: string;
	authority?: string;
	comments?: string;
	url?: string;
}

export default function DecreeModalWrapper() {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const handleSubmit = async (data: DecreeFormData) => {
		console.log("Decree data:", data);
		const result = await insertNorm(data as NewNorm);
		if (result.error) {
			console.error("Error inserting norm:", result.error);
			return;
		}
		setIsOpen(false);
		router.refresh();
	};

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
			>
				Crear Nueva Norma
			</button>
			<DecreeModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleSubmit} />
		</>
	);
}
