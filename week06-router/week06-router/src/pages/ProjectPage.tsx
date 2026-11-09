
import { useState } from "react";
import ProjectList from "../components/ProjectList";
import SectionHeading from "../components/SectionHeading";
import ProjectFilters, {
  type ProjectFilter,
} from "../components/ProjectFilters";
import AddProjectForm from "../components/AddProjectForm";
import type { LoadState, Project } from "../types";

interface ProjectsPageProps {
  projects: LoadState<Project[]>;
  canAddProjects: boolean;
  onRetry: () => void;
  onAdd: (project: Project) => void;
}

function ProjectsPage({
  projects,
  canAddProjects,
  onRetry,
  onAdd,
}: ProjectsPageProps) {
  const [projectFilter, setProjectFilter] =
    useState<ProjectFilter>("all");

  const visibleProjects: LoadState<Project[]> =
    projects.status === "success"
      ? {
          ...projects,
          data: projects.data.filter(
            (project) =>
              projectFilter === "all" ||
              project.status === projectFilter,
          ),
        }
      : projects;

  function handleAdd(project: Project): void {
    onAdd(project);
    setProjectFilter("all");
  }

  return (
    <div className="mx-auto w-[calc(100%-28px)] max-w-[1180px] py-6 sm:w-[calc(100%-40px)]">
      <section id="projects">
        <SectionHeading
          eyebrow="PROJECTS"
          title="All projects"
        />

        <ProjectFilters
          value={projectFilter}
          onChange={setProjectFilter}
        />

        <ProjectList
          state={visibleProjects}
          onRetry={onRetry}
        />
      </section>

      <AddProjectForm
        disabled={!canAddProjects}
        onAdd={handleAdd}
      />
    </div>
  );
}

export default ProjectsPage;
