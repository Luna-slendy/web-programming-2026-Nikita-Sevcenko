
import { useState } from "react";
import type { Category, Project } from "../types";

interface AddProjectFormProps {
  disabled: boolean;
  onAddProject: (project: Project) => void;
}

const categories: Category[] = [
  "Frontend",
  "API",
  "JavaScript",
  "Design",
];

function isCategory(value: string): value is Category {
  return categories.some((category) => category === value);
}

function AddProjectForm({
  disabled,
  onAddProject,
}: AddProjectFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [progress, setProgress] = useState("0");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanDescription = description.trim();
    const numericProgress = Number(progress);
    const nextErrors: Record<string, string> = {};

    if (cleanTitle.length < 3) {
      nextErrors.title = "Title must be at least 3 characters.";
    }

    if (cleanDescription.length < 10) {
      nextErrors.description =
        "Description must be at least 10 characters.";
    }

    if (!isCategory(category)) {
      nextErrors.category = "Please select a category.";
    }

    if (!dueDate) {
      nextErrors.dueDate = "Please select a due date.";
    }

    if (
      !Number.isInteger(numericProgress) ||
      numericProgress < 0 ||
      numericProgress > 100
    ) {
      nextErrors.progress =
        "Progress must be an integer from 0 to 100.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || !isCategory(category)) {
      return;
    }

    const project: Project = {
      id: crypto.randomUUID(),
      title: cleanTitle,
      description: cleanDescription,
      category,
      status: numericProgress === 100 ? "done" : "active",
      dueDate,
      progress: numericProgress,
    };

    onAddProject(project);

    setTitle("");
    setDescription("");
    setCategory("");
    setDueDate("");
    setProgress("0");
    setErrors({});
  }

  const fieldClass =
    "w-full rounded-xl border border-[#e5e9f2] bg-white px-3 py-2.5 text-[13px] outline-none transition focus:border-[#6d5dfc]";

  return (
    <section
      id="add-project"
      className="mx-auto w-[calc(100%-28px)] max-w-[1180px] py-[34px] min-[641px]:w-[calc(100%-40px)]"
    >
      <div className="mb-5">
        <p className="m-0 mb-2.5 text-[11px] font-extrabold tracking-[0.14em] text-[#6d5dfc]">
          NEW PROJECT
        </p>
        <h2 className="m-0 text-[28px] font-bold tracking-[-0.035em]">
          Add a project
        </h2>
        <p className="m-0 mt-2 text-[13px] text-[#6c7485]">
          Add a new project to your CampusFlow workspace.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-[18px] border border-[#e5e9f2] bg-white p-6"
      >
        <fieldset disabled={disabled} className="grid gap-5 border-0 p-0">
          <div>
            <label htmlFor="projectTitle" className="mb-2 block text-[11px] font-extrabold">
              Project title
            </label>
            <input
              id="projectTitle"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className={fieldClass}
            />
            <p className="mt-1 text-[11px] text-[#e25858]" aria-live="polite">
              {errors.title ?? ""}
            </p>
          </div>

          <div>
            <label htmlFor="projectDescription" className="mb-2 block text-[11px] font-extrabold">
              Description
            </label>
            <textarea
              id="projectDescription"
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className={`${fieldClass} resize-none`}
            />
            <p className="mt-1 text-[11px] text-[#e25858]" aria-live="polite">
              {errors.description ?? ""}
            </p>
          </div>

          <div className="grid gap-5 min-[641px]:grid-cols-2">
            <div>
              <label htmlFor="projectCategory" className="mb-2 block text-[11px] font-extrabold">
                Category
              </label>
              <select
                id="projectCategory"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className={fieldClass}
              >
                <option value="">Select category</option>
                {categories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <p className="mt-1 text-[11px] text-[#e25858]" aria-live="polite">
                {errors.category ?? ""}
              </p>
            </div>

            <div>
              <label htmlFor="projectDueDate" className="mb-2 block text-[11px] font-extrabold">
                Due date
              </label>
              <input
                id="projectDueDate"
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
                className={fieldClass}
              />
              <p className="mt-1 text-[11px] text-[#e25858]" aria-live="polite">
                {errors.dueDate ?? ""}
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="projectProgress" className="mb-2 block text-[11px] font-extrabold">
              Progress
            </label>
            <input
              id="projectProgress"
              type="number"
              min="0"
              max="100"
              step="1"
              value={progress}
              onChange={(event) => setProgress(event.target.value)}
              className={fieldClass}
            />
            <p className="mt-1 text-[11px] text-[#e25858]" aria-live="polite">
              {errors.progress ?? ""}
            </p>
          </div>

          <button
            type="submit"
            className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#6d5dfc] px-[18px] text-[12px] font-extrabold text-white shadow-[0_8px_18px_rgba(109,93,252,0.18)] transition hover:-translate-y-px hover:bg-[#5547df] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add project
          </button>
        </fieldset>
      </form>
    </section>
  );
}

export default AddProjectForm;
