import { useLocalStorage } from "./hooks/useLocalStorage";
import { isProjectList } from "./guards";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import DeadlinesPage from "./pages/DeadlinesPage";
import NotFoundPage from "./pages/NotFoundPage";

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

function withLocalProjects(
  state: LoadState<Project[]>,
  local: Project[],
): LoadState<Project[]> {
  if (state.status !== "success") {
    return state;
  }

  return {
    status: "success",
    data: [...state.data, ...local],
  };
}

function App({
  projects,
  deadlines,
  weather,
  onRetryProjects,
  onRetryDeadlines,
  onRetryWeather,
}: AppProps) {
  const [localProjects, setLocalProjects] =
    useLocalStorage<Project[]>(
      "campusflow.week06.localProjects",
      [],
      isProjectList,
    );

  const combinedProjects = withLocalProjects(
    projects,
    localProjects,
  );

  function handleAdd(project: Project): void {
    setLocalProjects([...localProjects, project]);
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={
            <DashboardPage
              projects={combinedProjects}
              deadlines={deadlines}
              weather={weather}
              onRetryDeadlines={onRetryDeadlines}
              onRetryWeather={onRetryWeather}
            />
          }
        />

        <Route
          path="projects"
          element={
            <ProjectsPage
              projects={combinedProjects}
              canAddProjects={projects.status === "success"}
              onRetry={onRetryProjects}
              onAdd={handleAdd}
            />
          }
        />

        <Route
          path="projects/:projectId"
          element={
            <ProjectDetailsPage
              projects={combinedProjects}
              onRetry={onRetryProjects}
            />
          }
        />

        <Route
          path="deadlines"
          element={
            <DeadlinesPage
              deadlines={deadlines}
              onRetry={onRetryDeadlines}
            />
          }
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;
