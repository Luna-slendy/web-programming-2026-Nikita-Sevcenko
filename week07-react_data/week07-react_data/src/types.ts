export type ProjectStatus =
  "active" | "done";

export type Category =
  | "Frontend"
  | "API"
  | "JavaScript"
  | "Design";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: Category;
  status: ProjectStatus;
  dueDate: string;
  progress: number;
}

export interface Deadline {
  title: string;
  course: string;
  date: string;
  time: string;
}

export type LoadState<T> =
  | {
      status: "loading";
    }
  | {
      status: "success";
      data: T;
    }
  | {
      status: "error";
      error: string;
    };

export interface CurrentWeather {
  time: string;
  temperature: number;
  windSpeed: number;
  weatherCode: number;
}