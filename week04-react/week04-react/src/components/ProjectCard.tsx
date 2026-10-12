import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-[18px] border border-[#e5e9f2] bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-bold text-primary">
          {project.category}
        </span>
        <span className="text-xs text-[#6c7485]">
          {project.status === "active" ? "Active" : "Completed"}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-bold">{project.title}</h3>

      <p className="text-sm text-[#6c7485]">{project.description}</p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-xs text-[#6c7485]">
          Due: {project.dueDate}
        </span>
        <span className="text-xs font-bold text-primary">
          {project.progress}%
        </span>
      </div>

      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-[#edf0f7]"
        role="progressbar"
        aria-label={`${project.title} progress`}
        aria-valuenow={project.progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${project.progress}%` }}
        />
      </div>
    </article>
  );
}

export default ProjectCard;