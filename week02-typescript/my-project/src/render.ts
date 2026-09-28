import type { Category, Deadline, Project } from "./types";

const categoryColors: Record<Category, string> = {
  Frontend: "bg-[#f0edff] text-[#6352ed]",
  API: "bg-[#eaf3ff] text-[#2f78d6]",
  JavaScript: "bg-[#e9f8f2] text-[#16875b]",
  Design: "bg-[#fff5de] text-[#aa7416]",
};

export function renderProjects(
  projects: Project[],
  container: HTMLElement
): void {
  container.innerHTML = "";

  projects.forEach((project) => {
    const article = document.createElement("article");
    article.className =
      "project-card rounded-[18px] border border-[#e5e9f2] bg-white p-[22px] transition-all duration-200 hover:-translate-y-[3px] hover:border-[#d5d9e6] hover:shadow-[0_18px_50px_rgba(34,45,78,0.08)]";

    const top = document.createElement("div");
    top.className = "flex items-center justify-between gap-3";

    const category = document.createElement("span");
    category.className = `inline-flex min-h-[25px] items-center rounded-full px-[9px] text-[10px] font-extrabold ${categoryColors[project.category]}`;
    category.textContent = project.category;

    const status = document.createElement("span");
    status.className =
      project.status === "done"
        ? "inline-flex min-h-[25px] items-center rounded-full bg-[#edf9f4] px-[9px] text-[10px] font-extrabold text-[#1ca76f]"
        : "inline-flex min-h-[25px] items-center rounded-full bg-[#eef6ff] px-[9px] text-[10px] font-extrabold text-[#3788ff]";

    status.textContent = project.status === "done" ? "Done" : "Active";

    top.append(category, status);

    const title = document.createElement("h3");
    title.className =
      "mt-6 mb-2 text-[20px] font-bold tracking-[-0.025em]";
    title.textContent = project.title;

    const description = document.createElement("p");
    description.className = "min-h-[66px] m-0 text-[13px] text-[#6c7485]";
    description.textContent = project.description;

    const info = document.createElement("div");
    info.className =
      "mt-[22px] mb-[9px] flex items-center justify-between gap-3 text-[10px] font-bold text-[#6c7485]";

    const dueDate = document.createElement("span");
    dueDate.textContent = `Due ${project.dueDate}`;

    const progressText = document.createElement("span");
    progressText.textContent = `${project.progress}% complete`;

    info.append(dueDate, progressText);

    const progressBackground = document.createElement("div");
    progressBackground.className =
      "h-[7px] overflow-hidden rounded-full bg-[#eceef4]";

    const progress = document.createElement("div");
    progress.className =
      "h-full rounded-full bg-[#6d5dfc] transition-all duration-300";

    progress.style.width = `${project.progress}%`;

    progressBackground.appendChild(progress);

    const link = document.createElement("a");
    link.className =
      "mt-[18px] inline-block text-[12px] font-extrabold text-[#6d5dfc] hover:text-[#5547df]";
    link.href = "#";
    link.textContent =
      project.status === "done" ? "View submission →" : "Open project →";

    article.append(
      top,
      title,
      description,
      info,
      progressBackground,
      link
    );

    container.appendChild(article);
  });
}

export function renderDeadlines(
  deadlines: Deadline[],
  container: HTMLElement
): void {
  container.innerHTML = "";

  deadlines.forEach((deadline) => {
    const article = document.createElement("article");
    article.className =
      "grid grid-cols-[auto_1fr_auto] items-center gap-3.5 border-b border-[#e5e9f2] px-2 py-3.5 last:border-b-0 max-[640px]:grid-cols-[auto_1fr]";

    const dateBox = document.createElement("div");
    dateBox.className =
      "grid min-h-[50px] w-[46px] place-content-center place-items-center rounded-xl bg-[#f8fafc]";

    const date = new Date(deadline.date);

    const day = document.createElement("strong");
    day.className = "text-[17px] leading-none";
    day.textContent = String(date.getDate());

    const month = document.createElement("span");
    month.className =
      "mt-1 text-[9px] font-extrabold text-[#6c7485]";
    month.textContent = date
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();

    dateBox.append(day, month);

    const information = document.createElement("div");
    information.className = "grid gap-[3px]";

    const title = document.createElement("strong");
    title.className = "text-[13px]";
    title.textContent = deadline.title;

    const course = document.createElement("span");
    course.className = "text-[11px] text-[#6c7485]";
    course.textContent = `${deadline.course} · ${deadline.time}`;

    information.append(title, course);

    const badge = document.createElement("span");
    badge.className =
      "inline-flex min-h-[25px] items-center rounded-full bg-[#fff5de] px-[9px] text-[10px] font-extrabold text-[#aa7416]";
    badge.textContent = "";

    article.append(dateBox, information, badge);

    container.appendChild(article);
  });
}