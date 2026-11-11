import { Link } from "react-router";
import Hero from "../components/Hero";
import Resources from "../components/Resources";
import StatCard from "../components/StatCard";
import DeadlineSection from "../components/DeadlineSection";
import WeatherCard from "../components/Weathercard";
import SectionHeading from "../components/SectionHeading";

import type {
  Deadline,
  LoadState,
  Project,
} from "../types";

interface DashboardPageProps {
  projects: LoadState<Project[]>;
  deadlines: LoadState<Deadline[]>;
  onRetryDeadlines: () => void;
}

function DashboardPage({
  projects,
  deadlines,
  onRetryDeadlines,
}: DashboardPageProps) {
  const activeCount =
    projects.status === "success"
      ? String(
          projects.data.filter(
            (project) => project.status === "active"
          ).length,
        )
      : projects.status === "loading"
        ? "…"
        : "–";

  const doneCount =
    projects.status === "success"
      ? String(
          projects.data.filter(
            (project) => project.status === "done"
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

  return (
    <div className="mx-auto w-[calc(100%-28px)] max-w-[1180px] py-6 sm:w-[calc(100%-40px)]">
      <Hero />

      <section id="overview" className="mt-6">
        <SectionHeading
          eyebrow="OVERVIEW"
          title="Your workspace"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            index="01"
            label="Active projects"
            value={activeCount}
            note={
              projects.status === "error"
                ? "Projects unavailable"
                : "API + your projects"
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
        </div>
      </section>

      <section id="deadlines" className="mt-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <SectionHeading
            eyebrow="DEADLINES"
            title="Coming up"
          />

          <Link
            to="/deadlines"
            className="shrink-0 text-sm font-semibold text-orange-600 transition hover:text-orange-700"
          >
            See all
          </Link>
        </div>

        <DeadlineSection
          state={deadlines}
          onRetry={onRetryDeadlines}
          limit={3}
        />
      </section>

      <section id="weather" className="mt-10">
        <SectionHeading
          eyebrow="WEATHER"
          title="Current conditions"
        />

        <WeatherCard />
      </section>

      <section id="resources" className="mt-10">
        <Resources />
      </section>
    </div>
  );
}

export default DashboardPage;
