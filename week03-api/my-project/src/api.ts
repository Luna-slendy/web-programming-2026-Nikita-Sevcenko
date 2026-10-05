import type { Deadline, Project } from "./types";
import { isDeadline, isProject } from "./guards";

export async function getJson(
  url: string
): Promise<unknown> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Request failed with status ${response.status}`
    );
  }

  return response.json();
}

export async function fetchProjects(): Promise<Project[]> {
  const data = await getJson("/api/projects.json");

  if (
    !Array.isArray(data) ||
    !data.every(isProject)
  ) {
    throw new Error("Invalid projects data.");
  }

  return data;
}

export async function fetchDeadlines(): Promise<Deadline[]> {
  const data = await getJson("/api/deadlines.json");

  if (
    !Array.isArray(data) ||
    !data.every(isDeadline)
  ) {
    throw new Error("Invalid deadlines data.");
  }

  return data;
}