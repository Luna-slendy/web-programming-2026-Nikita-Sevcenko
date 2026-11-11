import { useLocalStorage } from "./hooks/useLocalStorage";
import { useFetch } from "./hooks/useFetch";
import { fetchProjects, fetchDeadlines } from "./api";
import { isProjectList } from "./guards";
import { Route, Routes } from "react-router";

import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import DeadlinesPage from "./pages/DeadlinesPage";
import NotFoundPage from "./pages/NotFoundPage";

import type { Project, LoadState } from "./types";

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

function App() {
  const {
    state: projects,
    retry: onRetryProjects,
  } = useFetch(fetchProjects);

  const {
    state: deadlines,
    retry: onRetryDeadlines,
  } = useFetch(fetchDeadlines);

  const [localProjects, setLocalProjects] =
    useLocalStorage<Project[]>(
      "campusflow.week07.localProjects",
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
              onRetryDeadlines={onRetryDeadlines}
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
