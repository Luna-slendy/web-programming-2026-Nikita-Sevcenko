
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import {
  fetchDeadlines,
  fetchProjects,
  fetchWeather,
} from "./api.ts";

import { isProject } from "./guards.ts";

import type {
  CurrentWeather,
  Deadline,
  LoadState,
  Project,
} from "./types.ts";

const LOCAL_PROJECTS_KEY = "campusflow.week03.localProjects";

const container = document.getElementById("root");

if (container === null) {
  throw new Error("Element #root not found.");
}

const root = createRoot(container);

let apiProjects: Project[] = [];
let localProjects: Project[] = [];

let projectsState: LoadState<Project[]> = {
  status: "loading",
};

let deadlinesState: LoadState<Deadline[]> = {
  status: "loading",
};

let weatherState: LoadState<CurrentWeather> = {
  status: "loading",
};

function render(): void {
  root.render(
    <StrictMode>
      <App
        projects={projectsState}
        deadlines={deadlinesState}
        weather={weatherState}
        onRetryProjects={() => void loadProjects()}
        onRetryDeadlines={() => void loadDeadlines()}
        onRetryWeather={() => void loadWeather()}
        onAddProject={addProject}
      />
    </StrictMode>,
  );
}

function loadLocalProjects(): Project[] {
  const stored = localStorage.getItem(LOCAL_PROJECTS_KEY);

  if (!stored) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed) || !parsed.every(isProject)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
}

function saveLocalProjects(): void {
  localStorage.setItem(
    LOCAL_PROJECTS_KEY,
    JSON.stringify(localProjects),
  );
}

async function loadProjects(): Promise<void> {
  projectsState = { status: "loading" };
  render();

  try {
    apiProjects = await fetchProjects();
    localProjects = loadLocalProjects();

    projectsState = {
      status: "success",
      data: [...apiProjects, ...localProjects],
    };
  } catch (error) {
    projectsState = {
      status: "error",
      error:
        error instanceof Error
          ? error.message
          : "Failed to load projects.",
    };
  }

  render();
}

function addProject(project: Project): void {
  if (projectsState.status !== "success") {
    return;
  }

  localProjects = [...localProjects, project];
  saveLocalProjects();

  projectsState = {
    status: "success",
    data: [...apiProjects, ...localProjects],
  };

  render();
}

async function loadDeadlines(): Promise<void> {
  deadlinesState = { status: "loading" };
  render();

  try {
    const deadlines = await fetchDeadlines();

    deadlinesState = {
      status: "success",
      data: deadlines,
    };
  } catch (error) {
    deadlinesState = {
      status: "error",
      error:
        error instanceof Error
          ? error.message
          : "Failed to load deadlines.",
    };
  }

  render();
}

async function loadWeather(): Promise<void> {
  weatherState = { status: "loading" };
  render();

  try {
    const weather = await fetchWeather();

    weatherState = {
      status: "success",
      data: weather,
    };
  } catch (error) {
    weatherState = {
      status: "error",
      error:
        error instanceof Error
          ? error.message
          : "Failed to load weather.",
    };
  }

  render();
}

render();

void loadProjects();
void loadDeadlines();
void loadWeather();
