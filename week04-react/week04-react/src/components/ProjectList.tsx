
import type { LoadState, Project } from "../types";
import ProjectCard from "./ProjectCard";
import { LoadingBox, ErrorBox, EmptyBox } from "./StateBox";

interface ProjectListProps {
  state: LoadState<Project[]>;
  onRetry: () => void;
}

function ProjectList({ state, onRetry }: ProjectListProps) {
  if (state.status === "loading") {
    return <LoadingBox text="Loading projects…" />;
  }

  if (state.status === "error") {
    return <ErrorBox message={state.error} onRetry={onRetry} />;
  }

  if (state.data.length === 0) {
    return (
      <EmptyBox
        title="No projects yet"
        text="Your projects will appear here."
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {state.data.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export default ProjectList;
