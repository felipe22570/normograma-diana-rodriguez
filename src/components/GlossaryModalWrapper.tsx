"use client";

import { useState } from "react";
import GlossaryModal from "./GlossaryModal";
import { insertGlossary, type NewGlossary } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface GlossaryFormData {
	name: string;
	definition: string;
	source?: string;
}

interface GlossaryModalWrapperProps {
	onSuccess?: () => void;
}

export default function GlossaryModalWrapper({ onSuccess }: GlossaryModalWrapperProps) {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const handleSubmit = async (data: GlossaryFormData) => {
		const result = await insertGlossary(data as NewGlossary);
		if (result.error) {
			toast.error(result.error);
			return;
		}
		toast.success("Término creado correctamente");
		router.refresh();
		onSuccess?.();
		setIsOpen(false);
	};

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Crear Nuevo Término</Button>
			<GlossaryModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleSubmit} />
		</>
	);
}
