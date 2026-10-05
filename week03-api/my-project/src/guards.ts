import type {
  Category,
  Deadline,
  Project,
  ProjectStatus,
} from "./types";

function isCategory(value: unknown): value is Category {
  return (
    value === "Frontend" ||
    value === "API" ||
    value === "JavaScript" ||
    value === "Design"
  );
}

function isProjectStatus(
  value: unknown
): value is ProjectStatus {
  return value === "active" || value === "done";
}

export function isProject(
  value: unknown
): value is Project {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const project = value as Record<string, unknown>;

  return (
    typeof project.id === "string" &&
    typeof project.title === "string" &&
    typeof project.description === "string" &&
    isCategory(project.category) &&
    isProjectStatus(project.status) &&
    typeof project.dueDate === "string" &&
    typeof project.progress === "number" &&
    Number.isFinite(project.progress) &&
    project.progress >= 0 &&
    project.progress <= 100
  );
}

export function isDeadline(
  value: unknown
): value is Deadline {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const deadline = value as Record<string, unknown>;

  return (
    typeof deadline.title === "string" &&
    typeof deadline.course === "string" &&
    typeof deadline.date === "string" &&
    typeof deadline.time === "string"
  );
}