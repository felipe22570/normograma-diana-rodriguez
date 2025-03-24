"use client";

import { useState } from "react";
import DecreeModal from "./DecreeModal";
export default function DecreeModalWrapper() {
	const [isOpen, setIsOpen] = useState(false);

	const handleSubmit = async (data: unknown) => {
		console.log("Decree data:", data);
		// await insertDecree(data);
		setIsOpen(false);
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
