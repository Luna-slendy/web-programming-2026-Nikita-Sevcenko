import type { Category, ProjectStatus } from "./types";

export const categoryBadge: Record<Category, string> = {
  Frontend: "bg-violet-50 text-violet-700",
  API: "bg-blue-50 text-blue-700",
  JavaScript: "bg-amber-50 text-amber-700",
  Design: "bg-pink-50 text-pink-700",
};

export const statusLabel: Record<ProjectStatus, string> = {
  active: "Active",
  done: "Completed",
};

export const progressColor: Record<ProjectStatus, string> = {
  active: "bg-primary",
  done: "bg-emerald-500",
};