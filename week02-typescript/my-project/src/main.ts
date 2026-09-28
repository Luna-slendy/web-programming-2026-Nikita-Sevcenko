import "./styles.css";

import { initialProjects, initialDeadlines } from "./data";
import { renderProjects, renderDeadlines } from "./render";

const projectGrid = document.querySelector<HTMLElement>("#projectGrid");
const deadlineList = document.querySelector<HTMLElement>("#deadlineList");

if (projectGrid) {
  renderProjects(initialProjects, projectGrid);
}

if (deadlineList) {
  renderDeadlines(initialDeadlines, deadlineList);
}