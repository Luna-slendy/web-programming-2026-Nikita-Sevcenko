
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import {
  fetchDeadlines,
  fetchProjects,
  fetchWeather,
} from "./api.ts";

import type {
  CurrentWeather,
  Deadline,
  LoadState,
  Project,
} from "./types.ts";

const container = document.getElementById("root");

if (container === null) {
  throw new Error("Element #root not found.");
}

const root = createRoot(container);

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
      />
    </StrictMode>,
  );
}

async function loadProjects(): Promise<void> {
  projectsState = { status: "loading" };
  render();

  try {
    const projects = await fetchProjects();

    projectsState = {
      status: "success",
      data: projects,
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
