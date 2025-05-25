"use client";

import { useState, useEffect } from "react";

interface GlossaryFilterFormProps {
	onSearchChange: (search: string) => void;
}

function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
}

export default function GlossaryFilterForm({ onSearchChange }: GlossaryFilterFormProps) {
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce(search, 500);

	// Handle search input changes
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	// Handle debounced search changes
	useEffect(() => {
		onSearchChange(debouncedSearch);
	}, [debouncedSearch, onSearchChange]);

	return (
		<div className="space-y-4 bg-white rounded-lg shadow p-4">
			<div>
				<label htmlFor="glossary-search" className="block text-sm font-medium text-gray-700 mb-1">
					Buscar:
				</label>
				<input
					type="text"
					id="glossary-search"
					value={search}
					onChange={handleSearchChange}
					placeholder="Buscar por término, definición o fuente..."
					className="w-full p-2 border border-gray-300 rounded-md"
				/>
			</div>
		</div>
	);
}
