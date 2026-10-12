
import Header from "./components/Header";
import Hero from "./components/Hero";
import Resources from "./components/Resources";
import Footer from "./components/Footer";
import StatCard from "./components/StatCard";

import {
  LoadingBox,
  ErrorBox,
  EmptyBox,
} from "./components/StateBox";

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
}

function App({
  projects,
  deadlines,
  weather,
  onRetryProjects,
  onRetryDeadlines,
}: AppProps) {
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
          <p className="text-xs font-extrabold tracking-widest text-primary">
            OVERVIEW
          </p>
          <h2 className="mb-5 mt-2 text-2xl font-bold">
            Your workspace
          </h2>

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
              tone={weather.status === "error" ? "danger" : "neutral"}
            />
          </div>
        </section>

        <section id="projects" className="mt-10">
          <p className="text-xs font-extrabold tracking-widest text-primary">
            PROJECTS
          </p>
          <h2 className="mb-5 mt-2 text-2xl font-bold">
            Current work
          </h2>

          {projects.status === "loading" && (
            <LoadingBox text="Loading projects…" />
          )}

          {projects.status === "error" && (
            <ErrorBox
              message={projects.error}
              onRetry={onRetryProjects}
            />
          )}

          {projects.status === "success" &&
            (projects.data.length === 0 ? (
              <EmptyBox
                title="No projects yet"
                text="Your projects will appear here."
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projects.data.map((project) => (
                  <article
                    key={project.id}
                    className="rounded-[18px] border border-[#e5e9f2] bg-white p-5"
                  >
                    <p className="text-xs font-bold text-primary">
                      {project.category}
                    </p>
                    <h3 className="mt-3 text-lg font-bold">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#6c7485]">
                      {project.description}
                    </p>
                    <p className="text-xs text-[#6c7485]">
                      {project.progress}% complete
                    </p>
                  </article>
                ))}
              </div>
            ))}
        </section>

        <section id="deadlines" className="mt-10">
          <p className="text-xs font-extrabold tracking-widest text-primary">
            DEADLINES
          </p>
          <h2 className="mb-5 mt-2 text-2xl font-bold">
            Coming up
          </h2>

          {deadlines.status === "loading" && (
            <LoadingBox text="Loading deadlines…" />
          )}

          {deadlines.status === "error" && (
            <ErrorBox
              message={deadlines.error}
              onRetry={onRetryDeadlines}
            />
          )}

          {deadlines.status === "success" &&
            (deadlines.data.length === 0 ? (
              <EmptyBox
                title="No upcoming deadlines"
                text="You are all caught up."
              />
            ) : (
              <div className="grid gap-3">
                {deadlines.data.map((deadline) => (
                  <article
                    key={`${deadline.title}-${deadline.date}-${deadline.time}`}
                    className="rounded-xl border border-[#e5e9f2] bg-white p-4"
                  >
                    <h3 className="m-0 font-bold">
                      {deadline.title}
                    </h3>
                    <p className="mb-0 mt-2 text-sm text-[#6c7485]">
                      {deadline.course} · {deadline.date} · {deadline.time}
                    </p>
                  </article>
                ))}
              </div>
            ))}
        </section>

        <section className="mt-10">
          <Resources />
        </section>
      </main>

      <Footer note="Your workspace, one step at a time." />
    </>
  );
}

export default App;
