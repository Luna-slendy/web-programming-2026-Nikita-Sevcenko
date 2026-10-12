
import Header from "./components/Header";
import Hero from "./components/Hero";
import Resources from "./components/Resources";
import Footer from "./components/Footer";
import StatCard from "./components/StatCard";
import ProjectList from "./components/ProjectList";
import DeadlineSection from "./components/DeadlineSection";
import WeatherCard from "./components/WeatherCard";

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
}

function App({
  projects,
  deadlines,
  weather,
  onRetryProjects,
  onRetryDeadlines,
  onRetryWeather,
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

          <ProjectList
            state={projects}
            onRetry={onRetryProjects}
          />
        </section>

        <section id="deadlines" className="mt-10">
          <p className="text-xs font-extrabold tracking-widest text-primary">
            DEADLINES
          </p>
          <h2 className="mb-5 mt-2 text-2xl font-bold">
            Coming up
          </h2>

          <DeadlineSection
            state={deadlines}
            onRetry={onRetryDeadlines}
          />
        </section>

        <section id="weather" className="mt-10">
          <p className="text-xs font-extrabold tracking-widest text-primary">
            WEATHER
          </p>
          <h2 className="mb-5 mt-2 text-2xl font-bold">
            Current conditions
          </h2>

          <WeatherCard
            state={weather}
            onRetry={onRetryWeather}
          />
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
