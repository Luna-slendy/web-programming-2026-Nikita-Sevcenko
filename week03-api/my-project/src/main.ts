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

import type {
  Category,
  Project,
  ProjectStatus,
} from "./types";

type ProjectFilter = ProjectStatus | "all";

const projects: Project[] = [...initialProjects];

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

const projectForm =
  document.querySelector<HTMLFormElement>("#projectForm");

const projectTitle =
  document.querySelector<HTMLInputElement>("#projectTitle");

const projectDescription =
  document.querySelector<HTMLTextAreaElement>(
    "#projectDescription"
  );

const projectCategory =
  document.querySelector<HTMLSelectElement>(
    "#projectCategory"
  );

const projectDueDate =
  document.querySelector<HTMLInputElement>(
    "#projectDueDate"
  );

const projectProgress =
  document.querySelector<HTMLInputElement>(
    "#projectProgress"
  );

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

function isCategory(value: string): value is Category {
  return (
    value === "Frontend" ||
    value === "API" ||
    value === "JavaScript" ||
    value === "Design"
  );
}

function renderAll(): void {
  if (overviewGrid) {
    renderOverview(projects, overviewGrid);
  }

  if (projectGrid) {
    const filteredProjects =
      currentFilter === "all"
        ? projects
        : projects.filter(
            (project) => project.status === currentFilter
          );

    renderProjects(filteredProjects, projectGrid);
  }
}

function showFieldError(
  field: HTMLElement,
  message: string
): void {
  const error =
    field.parentElement?.querySelector<HTMLElement>(
      ".field-error"
    );

  if (error) {
    error.textContent = message;
  }
}

function clearFieldError(
  field: HTMLElement
): void {
  const error =
    field.parentElement?.querySelector<HTMLElement>(
      ".field-error"
    );

  if (error) {
    error.textContent = "";
  }
}

if (deadlineList) {
  renderDeadlines(initialDeadlines, deadlineList);
}

renderAll();

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

    renderAll();
  });
});

if (
  projectForm &&
  projectTitle &&
  projectDescription &&
  projectCategory &&
  projectDueDate &&
  projectProgress
) {
  projectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = projectTitle.value.trim();
    const description =
      projectDescription.value.trim();

    const categoryValue =
      projectCategory.value;

    const dueDate =
      projectDueDate.value;

    const progress =
      Number(projectProgress.value);

    clearFieldError(projectTitle);
    clearFieldError(projectDescription);
    clearFieldError(projectCategory);
    clearFieldError(projectDueDate);
    clearFieldError(projectProgress);

    let isValid = true;

    if (title.length < 3) {
      showFieldError(
        projectTitle,
        "Title must be at least 3 characters."
      );

      isValid = false;
    }

    if (description.length < 10) {
      showFieldError(
        projectDescription,
        "Description must be at least 10 characters."
      );

      isValid = false;
    }

    if (!isCategory(categoryValue)) {
      showFieldError(
        projectCategory,
        "Please select a category."
      );

      isValid = false;
    }

    if (!dueDate) {
      showFieldError(
        projectDueDate,
        "Please select a due date."
      );

      isValid = false;
    }

    if (
      !Number.isInteger(progress) ||
      progress < 0 ||
      progress > 100
    ) {
      showFieldError(
        projectProgress,
        "Progress must be an integer from 0 to 100."
      );

      isValid = false;
    }

    if (
      !isValid ||
      !isCategory(categoryValue)
    ) {
      return;
    }

    const newProject: Project = {
      id: crypto.randomUUID(),
      title,
      description,
      category: categoryValue,
      status:
        progress === 100 ? "done" : "active",
      dueDate,
      progress,
    };

    projects.push(newProject);

    renderAll();

    projectForm.reset();
    projectProgress.value = "0";
  });
}