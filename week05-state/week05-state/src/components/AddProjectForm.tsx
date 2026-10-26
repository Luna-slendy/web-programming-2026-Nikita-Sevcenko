import { useState, type SubmitEvent } from "react";
import type { Project } from "../types";
import {
  CATEGORIES,
  EMPTY_FORM,
  type FieldName,
  type FormErrors,
  type FormValues,
  validate,
} from "../validation";

interface AddProjectFormProps {
  disabled: boolean;
  onAdd: (project: Project) => void;
}

function AddProjectForm({
  disabled,
  onAdd,
}: AddProjectFormProps) {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");

  function update(name: FieldName, value: string): void {
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>): void {
    event.preventDefault();

    const result = validate(values);

    if (!result.ok) {
      setErrors(result.errors);
      setMessage("");
      return;
    }

    onAdd(result.project);

    setValues(EMPTY_FORM);
    setErrors({});
    setMessage(`${result.project.title} added.`);
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
        noValidate
        onSubmit={handleSubmit}
        className="rounded-[18px] border border-[#e5e9f2] bg-white p-6"
      >
        <fieldset
          disabled={disabled}
          className="grid gap-5 border-0 p-0"
        >
          <div>
            <label
              htmlFor="projectTitle"
              className="mb-2 block text-[11px] font-extrabold"
            >
              Title
            </label>

            <input
              id="projectTitle"
              name="title"
              type="text"
              value={values.title}
              onChange={(event) => update("title", event.target.value)}
              aria-invalid={errors.title !== undefined}
              className={fieldClass}
            />

            {errors.title !== undefined && (
              <p className="mt-1 text-[11px] text-[#e25858]">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="projectCategory"
              className="mb-2 block text-[11px] font-extrabold"
            >
              Category
            </label>

            <select
              id="projectCategory"
              name="category"
              value={values.category}
              onChange={(event) => update("category", event.target.value)}
              aria-invalid={errors.category !== undefined}
              className={fieldClass}
            >
              <option value="">Choose…</option>

              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {errors.category !== undefined && (
              <p className="mt-1 text-[11px] text-[#e25858]">
                {errors.category}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="projectDescription"
              className="mb-2 block text-[11px] font-extrabold"
            >
              Description
            </label>

            <textarea
              id="projectDescription"
              name="description"
              rows={4}
              value={values.description}
              onChange={(event) =>
                update("description", event.target.value)
              }
              aria-invalid={errors.description !== undefined}
              className={`${fieldClass} resize-none`}
            />

            <p
              className={`mt-1 text-[11px] ${
                values.description.length > 200
                  ? "text-[#e25858]"
                  : "text-[#6c7485]"
              }`}
            >
              {values.description.length}/200
            </p>

            {errors.description !== undefined && (
              <p className="mt-1 text-[11px] text-[#e25858]">
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="projectDueDate"
              className="mb-2 block text-[11px] font-extrabold"
            >
              Due date
            </label>

            <input
              id="projectDueDate"
              name="dueDate"
              type="date"
              value={values.dueDate}
              onChange={(event) => update("dueDate", event.target.value)}
              aria-invalid={errors.dueDate !== undefined}
              className={fieldClass}
            />

            {errors.dueDate !== undefined && (
              <p className="mt-1 text-[11px] text-[#e25858]">
                {errors.dueDate}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="projectProgress"
              className="mb-2 block text-[11px] font-extrabold"
            >
              Progress (%)
            </label>

            <input
              id="projectProgress"
              name="progress"
              type="number"
              min="0"
              max="100"
              step="1"
              value={values.progress}
              onChange={(event) => update("progress", event.target.value)}
              aria-invalid={errors.progress !== undefined}
              className={fieldClass}
            />

            {errors.progress !== undefined && (
              <p className="mt-1 text-[11px] text-[#e25858]">
                {errors.progress}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#6d5dfc] px-[18px] text-[12px] font-extrabold text-white shadow-[0_8px_18px_rgba(109,93,252,0.18)] transition hover:-translate-y-px hover:bg-[#5547df] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add project
          </button>

          <p
            role="status"
            className="m-0 text-[12px] text-[#16803d]"
          >
            {message}
          </p>
        </fieldset>
      </form>
    </section>
  );
}

export default AddProjectForm;