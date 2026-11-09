import { useState } from "react";

function readStored<T>(
  key: string,
  fallback: T,
  isValid: (value: unknown) => value is T,
): T {
  try {
    const stored = localStorage.getItem(key);

    if (stored === null) {
      return fallback;
    }

    const parsed: unknown = JSON.parse(stored);

    return isValid(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function useLocalStorage<T>(
  key: string,
  fallback: T,
  isValid: (value: unknown) => value is T,
): readonly [T, (next: T) => void] {
  const [value, setValue] = useState<T>(() =>
    readStored(key, fallback, isValid),
  );

  function updateValue(next: T): void {
    setValue(next);

    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // Keep the in-memory state even if storage is unavailable.
    }
  }

  return [value, updateValue] as const;
}