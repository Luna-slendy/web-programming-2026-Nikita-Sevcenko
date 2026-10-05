import type {
  CurrentWeather,
  Deadline,
  Project,
} from "./types";

import {
  isCurrentWeather,
  isDeadline,
  isProject,
} from "./guards";

export async function getJson(
  url: string
): Promise<unknown> {
  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Request failed with status ${response.status}`
    );
  }

  return response.json();
}

export async function fetchProjects(): Promise<Project[]> {
  const data =
    await getJson(
      "/api/projects.json"
    );

  if (
    !Array.isArray(data) ||
    !data.every(isProject)
  ) {
    throw new Error(
      "Invalid projects data."
    );
  }

  return data;
}

export async function fetchDeadlines(): Promise<Deadline[]> {
  const data =
    await getJson(
      "/api/deadlines.json"
    );

  if (
    !Array.isArray(data) ||
    !data.every(isDeadline)
  ) {
    throw new Error(
      "Invalid deadlines data."
    );
  }

  return data;
}

export async function fetchWeather(): Promise<CurrentWeather> {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=56.9496&longitude=24.1052&current=temperature_2m,wind_speed_10m,weather_code";

  const data =
    await getJson(url);

  if (
    typeof data !== "object" ||
    data === null
  ) {
    throw new Error(
      "Invalid weather response."
    );
  }

  const response =
    data as Record<string, unknown>;

  const current =
    response.current;

  if (
    typeof current !== "object" ||
    current === null
  ) {
    throw new Error(
      "Invalid weather current data."
    );
  }

  const currentData =
    current as Record<
      string,
      unknown
    >;

  const weather: unknown = {
    time: currentData.time,
    temperature:
      currentData.temperature_2m,
    windSpeed:
      currentData.wind_speed_10m,
    weatherCode:
      currentData.weather_code,
  };

  if (
    !isCurrentWeather(weather)
  ) {
    throw new Error(
      "Invalid weather data."
    );
  }

  return weather;
}