import type { Category, Project } from "./types";

export const CATEGORIES: Category[] = [
  "Frontend",
  "API",
  "JavaScript",
  "Design",
];

export interface FormValues {
  title: string;
  description: string;
  category: string;
  dueDate: string;
  progress: string;
}

export type FieldName = keyof FormValues;

export type FormErrors = Partial<Record<FieldName, string>>;

export const EMPTY_FORM: FormValues = {
  title: "",
  description: "",
  category: "",
  dueDate: "",
  progress: "",
};

export type ValidationResult =
  | { ok: true; project: Project }
  | { ok: false; errors: FormErrors };

function isCategory(value: string): value is Category {
  return CATEGORIES.some((category) => category === value);
}

export function validate(values: FormValues): ValidationResult {
  const errors: FormErrors = {};

  const title = values.title.trim();
  const description = values.description.trim();
  const progressText = values.progress.trim();
  const progress = Number(progressText);

  if (title.length < 3) {
    errors.title = "Title must be at least 3 characters.";
  }

  if (description.length < 10) {
    errors.description =
      "Description must be at least 10 characters.";
  } else if (description.length > 200) {
    errors.description =
      "Description must not exceed 200 characters.";
  }

  if (!isCategory(values.category)) {
    errors.category = "Please select a valid category.";
  }

  if (values.dueDate.trim() === "") {
    errors.dueDate = "Please select a due date.";
  }

  if (
    progressText === "" ||
    !Number.isInteger(progress) ||
    progress < 0 ||
    progress > 100
  ) {
    errors.progress =
      "Progress must be an integer from 0 to 100.";
  }

  if (Object.keys(errors).length > 0 || !isCategory(values.category)) {
    return { ok: false, errors };
  }

  const project: Project = {
    id: crypto.randomUUID(),
    title,
    description,
    category: values.category,
    status: progress === 100 ? "done" : "active",
    dueDate: values.dueDate,
    progress,
  };

  return { ok: true, project };
}