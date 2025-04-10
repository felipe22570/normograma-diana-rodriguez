"use client";

import { useState, useEffect } from "react";
import { FilterParams, getFilterOptions } from "@/app/actions";

interface FilterFormProps {
	onFilterChange: (filters: FilterParams) => void;
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

export default function FilterForm({ onFilterChange }: FilterFormProps) {
	const [localFilters, setLocalFilters] = useState<FilterParams>({
		year: "Todos los años",
		type: "Todos los tipos",
		search: "",
	});

	const [options, setOptions] = useState({
		years: ["Todos los años"],
		types: ["Todos los tipos"],
	});

	const [loading, setLoading] = useState(true);

	const debouncedSearch = useDebounce(localFilters.search, 1000);

	useEffect(() => {
		async function loadFilterOptions() {
			try {
				const filterOptions = await getFilterOptions();
				setOptions(filterOptions);
			} catch (error) {
				console.error("Error loading filter options:", error);
			} finally {
				setLoading(false);
			}
		}

		loadFilterOptions();
	}, []);

	// Handle immediate filter changes (year and type)
	const handleFilterChange = (newFilters: Partial<FilterParams>) => {
		const updatedFilters = { ...localFilters, ...newFilters };
		setLocalFilters(updatedFilters);
		onFilterChange(updatedFilters);
	};

	// Handle search input changes
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalFilters((prev) => ({ ...prev, search: e.target.value }));
	};

	// Handle debounced search changes
	useEffect(() => {
		if (debouncedSearch !== localFilters.search) {
			onFilterChange({ ...localFilters, search: debouncedSearch });
		}
	}, [debouncedSearch]);

	if (loading) {
		return (
			<div className="space-y-4 bg-white rounded-lg shadow p-4 animate-pulse">
				<div className="h-10 bg-gray-200 rounded"></div>
				<div className="h-10 bg-gray-200 rounded"></div>
				<div className="h-10 bg-gray-200 rounded"></div>
			</div>
		);
	}

	return (
		<div className="space-y-4 bg-white rounded-lg shadow p-4">
			<div>
				<label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
					Filtrar por año:
				</label>
				<select
					id="year"
					value={localFilters.year}
					onChange={(e) => handleFilterChange({ year: e.target.value })}
					className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
				>
					{options.years.map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>
			</div>

			<div>
				<label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
					Filtrar por tipo:
				</label>
				<select
					id="type"
					value={localFilters.type}
					onChange={(e) => handleFilterChange({ type: e.target.value })}
					className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
				>
					{options.types.map((type) => (
						<option key={type} value={type}>
							{type}
						</option>
					))}
				</select>
			</div>

			<div>
				<label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
					Buscar:
				</label>
				<input
					type="text"
					id="search"
					value={localFilters.search}
					onChange={handleSearchChange}
					placeholder="Buscar por nombre o descripción"
					className="w-full p-2 border border-gray-300 rounded-md"
				/>
			</div>
		</div>
	);
}
