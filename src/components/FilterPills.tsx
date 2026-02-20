'use client';

interface Filter {
  key: string;
  label: string;
}

interface FilterPillsProps {
  filters: Filter[];
  activeFilter: string;
  onFilterChange: (key: string) => void;
}

export default function FilterPills({ filters, activeFilter, onFilterChange }: FilterPillsProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            activeFilter === filter.key
              ? 'bg-midnight text-white'
              : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
