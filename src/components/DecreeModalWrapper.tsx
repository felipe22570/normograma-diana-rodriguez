"use client";

import { useState } from "react";
import DecreeModal from "./DecreeModal";
import { insertNorm, type NewNorm } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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

interface DecreeModalWrapperProps {
	onSuccess?: () => void;
}

export default function DecreeModalWrapper({ onSuccess }: DecreeModalWrapperProps) {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const handleSubmit = async (data: DecreeFormData) => {
		const result = await insertNorm(data as NewNorm);
		if (result.error) {
			toast.error(result.error);
			return;
		}
		toast.success("Norma creada correctamente");
		router.refresh();
		onSuccess?.();
		setIsOpen(false);
	};

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Crear Nueva Norma</Button>
			<DecreeModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleSubmit} />
		</>
	);
}
