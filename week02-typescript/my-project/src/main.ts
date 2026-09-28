import "./styles.css";

import {
  initialProjects,
  initialDeadlines,
} from "./data";

import {
  renderOverview,
  renderProjects,
  renderDeadlines,
} from "./render";

import type { ProjectStatus } from "./types";

type ProjectFilter = ProjectStatus | "all";

const overviewGrid =
  document.querySelector<HTMLElement>("#overviewGrid");

const projectGrid =
  document.querySelector<HTMLElement>("#projectGrid");

const deadlineList =
  document.querySelector<HTMLElement>("#deadlineList");

const menuButton =
  document.querySelector<HTMLButtonElement>("#menuButton");

const mainNav =
  document.querySelector<HTMLElement>("#mainNav");

const filterButtons =
  document.querySelectorAll<HTMLButtonElement>(".filter-button");

let currentFilter: ProjectFilter = "all";

function isProjectFilter(
  value: string | undefined
): value is ProjectFilter {
  return (
    value === "all" ||
    value === "active" ||
    value === "done"
  );
}

function renderFilteredProjects(): void {
  if (!projectGrid) {
    return;
  }

  const filteredProjects =
    currentFilter === "all"
      ? initialProjects
      : initialProjects.filter(
          (project) => project.status === currentFilter
        );

  renderProjects(filteredProjects, projectGrid);
}

if (overviewGrid) {
  renderOverview(initialProjects, overviewGrid);
}

if (deadlineList) {
  renderDeadlines(initialDeadlines, deadlineList);
}

renderFilteredProjects();

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isHidden =
      mainNav.classList.toggle("hidden");

    menuButton.setAttribute(
      "aria-expanded",
      String(!isHidden)
    );
  });
}

const activeFilterClasses = [
  "bg-[#f0f2f7]",
  "text-[#172033]",
];

const inactiveFilterClasses = [
  "bg-transparent",
  "text-[#6c7485]",
];

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    if (!isProjectFilter(selectedFilter)) {
      return;
    }

    currentFilter = selectedFilter;

    filterButtons.forEach((item) => {
      item.classList.remove(
        "active",
        ...activeFilterClasses
      );

      item.classList.add(
        ...inactiveFilterClasses
      );
    });

    button.classList.remove(
      ...inactiveFilterClasses
    );

    button.classList.add(
      "active",
      ...activeFilterClasses
    );

    renderFilteredProjects();
  });
});