"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface GlossaryFormData {
	name: string;
	definition: string;
	source?: string;
}

interface GlossaryModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: GlossaryFormData) => void;
	initialData?: GlossaryFormData;
}

export default function GlossaryModal({ isOpen, onClose, onSubmit, initialData }: GlossaryModalProps) {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const glossaryData: GlossaryFormData = {
			name: formData.get("name") as string,
			definition: formData.get("definition") as string,
			source: formData.get("source") as string,
		};
		onSubmit(glossaryData);
		e.currentTarget.reset();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[600px] w-[600px] max-h-[90vh] overflow-y-auto bg-white border shadow-lg">
				<DialogHeader>
					<DialogTitle>{initialData ? "Editar Término" : "Crear Nuevo Término"}</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Término</Label>
						<Input id="name" name="name" required defaultValue={initialData?.name} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="definition">Definición</Label>
						<Textarea
							id="definition"
							name="definition"
							rows={5}
							required
							defaultValue={initialData?.definition}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="source">Fuente</Label>
						<Input id="source" name="source" defaultValue={initialData?.source} />
					</div>
					<div className="flex justify-end gap-2">
						<Button type="button" variant="outline" onClick={onClose}>
							Cancelar
						</Button>
						<Button type="submit">{initialData ? "Actualizar" : "Crear"}</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
