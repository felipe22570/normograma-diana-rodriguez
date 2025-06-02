"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AccessKeyFormProps {
	onAccessGranted: () => void;
}

export default function AccessKeyForm({ onAccessGranted }: AccessKeyFormProps) {
	const [accessKey, setAccessKey] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const response = await fetch("/api/validate-access", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ accessKey }),
			});

			const data = await response.json();

			if (data.valid) {
				onAccessGranted();
			} else {
				setError("Clave de acceso incorrecta. Por favor, inténtalo de nuevo.");
			}
		} catch {
			setError("Error al validar la clave. Por favor, inténtalo de nuevo.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
			<div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
				<div className="text-center mb-8">
					<div className="flex justify-center mb-4">
						<div className="p-3 bg-blue-100 rounded-full">
							<svg
								className="h-8 w-8 text-blue-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
								/>
							</svg>
						</div>
					</div>
					<h1 className="text-2xl font-bold text-gray-900 mb-2">Acceso Restringido</h1>
					<p className="text-gray-600">Ingresa la clave de acceso para continuar</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="accessKey" className="text-sm font-medium text-gray-700">
							Clave de Acceso
						</Label>
						<Input
							id="accessKey"
							type="password"
							placeholder="Ingresa tu clave de acceso"
							value={accessKey}
							onChange={(e) => setAccessKey(e.target.value)}
							className="w-full"
							required
						/>
					</div>

					{error && (
						<div className="bg-red-50 border border-red-200 rounded-md p-3">
							<p className="text-sm text-red-600">{error}</p>
						</div>
					)}

					<Button
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 text-white"
						disabled={isLoading || !accessKey.trim()}
					>
						{isLoading ? "Validando..." : "Acceder"}
					</Button>
				</form>
			</div>
		</div>
	);
}
