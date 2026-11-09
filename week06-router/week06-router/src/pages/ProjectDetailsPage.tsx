import { Link, useParams } from "react-router";
import {
  LoadingBox,
  ErrorBox,
  EmptyBox,
} from "../components/StateBox";
import { formatDate, daysUntil } from "../format";
import {
  categoryBadge,
  progressColor,
  statusLabel,
} from "../ProjectStyles";
import type { LoadState, Project } from "../types";

interface ProjectDetailsPageProps {
  projects: LoadState<Project[]>;
  onRetry: () => void;
}

function ProjectDetailsPage({
  projects,
  onRetry,
}: ProjectDetailsPageProps) {
  const { projectId } = useParams<"projectId">();

  if (projects.status === "loading") {
    return <LoadingBox text="Loading project…" />;
  }

  if (projects.status === "error") {
    return (
      <ErrorBox
        message={projects.error}
        onRetry={onRetry}
      />
    );
  }

  const project = projects.data.find(
    (item) => item.id === projectId,
  );

  if (project === undefined) {
    return (
      <div className="mx-auto w-[calc(100%-28px)] max-w-[1180px] py-6 sm:w-[calc(100%-40px)]">
        <EmptyBox
          title="Project not found"
          text={`No project exists with ID: ${projectId ?? "unknown"}`}
        />

        <Link
          to="/projects"
          className="mt-5 inline-flex text-sm font-semibold text-primary hover:underline"
        >
          ← Back to projects
        </Link>
      </div>
    );
  }

  const remainingDays = daysUntil(project.dueDate);

  const deadlineLabel = Number.isNaN(remainingDays)
    ? "Date unavailable"
    : remainingDays < 0
      ? `${Math.abs(remainingDays)} days overdue`
      : remainingDays === 0
        ? "Due today"
        : `${remainingDays} days remaining`;

  return (
    <div className="mx-auto w-[calc(100%-28px)] max-w-[1180px] py-6 sm:w-[calc(100%-40px)]">
      <Link
        to="/projects"
        className="mb-6 inline-flex text-sm font-semibold text-primary hover:underline"
      >
        ← Back to projects
      </Link>

      <article className="rounded-[18px] border border-[#e5e9f2] bg-white p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${categoryBadge[project.category]}`}
          >
            {project.category}
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            {statusLabel[project.status]}
          </span>
        </div>

        <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {project.title}
        </h1>

        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[#6c7485]">
          {project.description}
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl bg-[#f7f8fc] p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-[#6c7485]">
              Due date
            </p>

            <p className="mt-2 font-semibold text-slate-900">
              {formatDate(project.dueDate)}
            </p>

            <p className="mt-1 text-xs text-[#6c7485]">
              {deadlineLabel}
            </p>
          </div>

          <div className="rounded-xl bg-[#f7f8fc] p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-[#6c7485]">
              Progress
            </p>

            <p className="mt-2 font-semibold text-slate-900">
              {project.progress}%
            </p>

            <div
              className="mt-3 h-2 overflow-hidden rounded-full bg-[#edf0f7]"
              role="progressbar"
              aria-label={`${project.title} progress`}
              aria-valuenow={project.progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={`h-full rounded-full ${progressColor[project.status]}`}
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-[#e5e9f2] pt-5">
          <p className="text-xs font-bold uppercase tracking-wide text-[#6c7485]">
            Project ID
          </p>

          <p className="mt-1 text-sm text-slate-700">
            {project.id}
          </p>
        </div>
      </article>
    </div>
  );
}

export default ProjectDetailsPage;