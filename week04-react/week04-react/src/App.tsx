import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Resources from "./components/Resources";
import Footer from "./components/Footer";
import StatCard from "./components/StatCard";
import ProjectList from "./components/ProjectList";
import DeadlineSection from "./components/DeadlineSection";
import WeatherCard from "./components/Weathercard";
import SectionHeading from "./components/SectionHeading";
import ProjectFilters, {
  type ProjectFilter,
} from "./components/ProjectFilters";
import AddProjectForm from "./components/AddProjectForm";

import type {
  CurrentWeather,
  Deadline,
  LoadState,
  Project,
} from "./types";

interface AppProps {
  projects: LoadState<Project[]>;
  deadlines: LoadState<Deadline[]>;
  weather: LoadState<CurrentWeather>;
  onRetryProjects: () => void;
  onRetryDeadlines: () => void;
  onRetryWeather: () => void;
  onAddProject: (project: Project) => void;
}

function App({
  projects,
  deadlines,
  weather,
  onRetryProjects,
  onRetryDeadlines,
  onRetryWeather,
  onAddProject,
}: AppProps) {
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

  const activeCount =
    projects.status === "success"
      ? String(
          projects.data.filter(
            (project) => project.status === "active",
          ).length,
        )
      : projects.status === "loading"
        ? "…"
        : "–";

  const doneCount =
    projects.status === "success"
      ? String(
          projects.data.filter(
            (project) => project.status === "done",
          ).length,
        )
      : projects.status === "loading"
        ? "…"
        : "–";

  const deadlineCount =
    deadlines.status === "success"
      ? String(deadlines.data.length)
      : deadlines.status === "loading"
        ? "…"
        : "–";

  const temperature =
    weather.status === "success"
      ? `${weather.data.temperature}°C`
      : weather.status === "loading"
        ? "…"
        : "–";

  const weatherNote =
    weather.status === "success"
      ? `Wind: ${weather.data.windSpeed} km/h`
      : weather.status === "loading"
        ? "Loading weather…"
        : "Weather unavailable";

  return (
    <>
      <Header
        userName="Alex Student"
        userInitials="AZ"
        course="Web Programming"
      />

      <main className="mx-auto w-[calc(100%-28px)] max-w-[1180px] py-6 sm:w-[calc(100%-40px)]">
        <Hero />

        <section id="overview" className="mt-6">
          <SectionHeading
            eyebrow="OVERVIEW"
            title="Your workspace"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              index="01"
              label="Active projects"
              value={activeCount}
              note={
                projects.status === "error"
                  ? "Projects unavailable"
                  : "Projects in progress"
              }
              tone="positive"
            />

            <StatCard
              index="02"
              label="Completed"
              value={doneCount}
              note="Finished projects"
              tone="neutral"
            />

            <StatCard
              index="03"
              label="Upcoming deadlines"
              value={deadlineCount}
              note={
                deadlines.status === "error"
                  ? "Deadlines unavailable"
                  : "Deadlines to review"
              }
              tone="neutral"
            />

            <StatCard
              index="04"
              label="Rīga now"
              value={temperature}
              note={weatherNote}
              tone={
                weather.status === "error"
                  ? "danger"
                  : "neutral"
              }
            />
          </div>
        </section>

        <section id="projects" className="mt-10">
          <SectionHeading
            eyebrow="PROJECTS"
            title="Current work"
          />

          <ProjectFilters
            value={projectFilter}
            onChange={setProjectFilter}
          />

          <ProjectList
            state={visibleProjects}
            onRetry={onRetryProjects}
          />
        </section>

        <AddProjectForm
          disabled={projects.status !== "success"}
          onAddProject={onAddProject}
        />

        <section id="deadlines" className="mt-10">
          <SectionHeading
            eyebrow="DEADLINES"
            title="Coming up"
          />

          <DeadlineSection
            state={deadlines}
            onRetry={onRetryDeadlines}
          />
        </section>

        <section id="weather" className="mt-10">
          <SectionHeading
            eyebrow="WEATHER"
            title="Current conditions"
          />

          <WeatherCard
            state={weather}
            onRetry={onRetryWeather}
          />
        </section>

        <section id="resources" className="mt-10">
          <Resources />
        </section>
      </main>

      <Footer note="Your workspace, one step at a time." />
    </>
  );
}

export default App;
