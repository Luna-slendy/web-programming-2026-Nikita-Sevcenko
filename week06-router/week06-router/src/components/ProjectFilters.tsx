
import type { ProjectStatus } from "../types";

export type ProjectFilter = "all" | ProjectStatus;

interface ProjectFiltersProps {
  value: ProjectFilter;
  onChange: (filter: ProjectFilter) => void;
}

const filters: { label: string; value: ProjectFilter }[] = [
  { label: "All projects", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "done" },
];

function ProjectFilters({ value, onChange }: ProjectFiltersProps) {
  return (
    <div
      className="mb-5 flex flex-wrap gap-2"
      aria-label="Filter projects"
    >
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => onChange(filter.value)}
          aria-pressed={value === filter.value}
          className={`rounded-full px-4 py-2 text-sm font-bold transition ${
            value === filter.value
              ? "bg-primary text-white"
              : "border border-[#e5e9f2] bg-white text-[#6c7485] hover:bg-[#f5f6fa]"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default ProjectFilters;
