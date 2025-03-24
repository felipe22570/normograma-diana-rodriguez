"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

interface DecreeModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: DecreeFormData) => void;
}

export default function DecreeModal({ isOpen, onClose, onSubmit }: DecreeModalProps) {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const decreeData: DecreeFormData = {
			name: formData.get("name") as string,
			type: formData.get("type") as string,
			emission_date: formData.get("date") as string,
			description: formData.get("description") as string,
			observations: formData.get("observations") as string,
			authority: formData.get("authority") as string,
			comments: formData.get("comments") as string,
			url: formData.get("url") as string,
		};
		onSubmit(decreeData);
		e.currentTarget.reset();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[600px] w-[600px] max-h-[90vh] overflow-y-auto bg-white border shadow-lg">
				<DialogHeader>
					<DialogTitle>Crear Nueva Norma</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="type">Tipo</Label>
						<Input id="type" name="type" required />
					</div>
					<div className="space-y-2">
						<Label htmlFor="name">Nombre</Label>
						<Input id="name" name="name" required />
					</div>
					<div className="space-y-2">
						<Label htmlFor="date">Fecha de emisión</Label>
						<Input id="date" name="date" type="date" required />
					</div>
					<div className="space-y-2">
						<Label htmlFor="description">Descripción</Label>
						<Textarea id="description" name="description" rows={5} required />
					</div>
					<div className="space-y-2">
						<Label htmlFor="observations">Observaciones</Label>
						<Textarea id="observations" name="observations" rows={5} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="authority">Autoridad que emite la norma</Label>
						<Input id="authority" name="authority" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="comments">Comentarios</Label>
						<Textarea id="comments" name="comments" rows={3} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="url">URL</Label>
						<Input id="url" name="url" />
					</div>
					<div className="flex justify-end gap-2">
						<Button type="button" variant="outline" onClick={onClose}>
							Cancelar
						</Button>
						<Button type="submit">Crear Norma</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
