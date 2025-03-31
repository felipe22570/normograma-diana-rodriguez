"use client";

import { Norm } from "@/lib/actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { updateNorm } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface EditNormModalProps {
	norm: Norm;
	isOpen: boolean;
	onClose: () => void;
	onSuccess?: () => void;
}

export default function EditNormModal({ norm, isOpen, onClose, onSuccess }: EditNormModalProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		const formData = new FormData(e.currentTarget);
		const updatedNorm = {
			name: formData.get("name") as string,
			type: formData.get("type") as string,
			emission_date: formData.get("emission_date") as string,
			description: formData.get("description") as string,
			observations: formData.get("observations") as string,
			authority: formData.get("authority") as string,
			comments: formData.get("comments") as string,
			url: formData.get("url") as string,
		};

		const { error } = await updateNorm(norm.id, updatedNorm);

		if (error) {
			toast.error(error);
		} else {
			toast.success("Norma actualizada correctamente");
			router.refresh();
			onSuccess?.();
			onClose();
		}

		setIsLoading(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[600px] w-[600px] max-h-[90vh] overflow-y-auto bg-white border shadow-lg">
				<DialogHeader>
					<DialogTitle>Editar Norma</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Nombre</Label>
						<Input id="name" name="name" defaultValue={norm.name} required />
					</div>
					<div className="space-y-2">
						<Label htmlFor="type">Tipo</Label>
						<Input id="type" name="type" defaultValue={norm.type} required />
					</div>
					<div className="space-y-2">
						<Label htmlFor="emission_date">Fecha de emisión</Label>
						<Input
							id="emission_date"
							name="emission_date"
							type="date"
							defaultValue={norm.emission_date}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="description">Descripción</Label>
						<Textarea
							id="description"
							name="description"
							rows={5}
							defaultValue={norm.description || ""}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="observations">Observaciones</Label>
						<Textarea
							id="observations"
							name="observations"
							rows={5}
							defaultValue={norm.observations || ""}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="authority">Autoridad</Label>
						<Input id="authority" name="authority" defaultValue={norm.authority || ""} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="comments">Comentarios</Label>
						<Textarea id="comments" name="comments" defaultValue={norm.comments || ""} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="url">URL</Label>
						<Input id="url" name="url" defaultValue={norm.url || ""} />
					</div>
					<div className="flex justify-end gap-2">
						<Button type="button" variant="outline" onClick={onClose}>
							Cancelar
						</Button>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? "Guardando..." : "Guardar"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
