
import { useEffect, useState } from "react";
import type { LoadState } from "../types";

export interface FetchResult<T> {
  state: LoadState<T>;
  retry: () => void;
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Could not load data";
}

export function useFetch<T>(
  fetcher: (signal: AbortSignal) => Promise<T>
): FetchResult<T> {
  const [state, setState] = useState<LoadState<T>>({
    status: "loading",
  });

  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load(): Promise<void> {
      try {
        const data = await fetcher(controller.signal);

        if (!controller.signal.aborted) {
          setState({
            status: "success",
            data,
          });
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setState({
            status: "error",
            error: errorMessage(error),
          });
        }
      }
    }

    void load();

    return () => {
      controller.abort();
    };
  }, [fetcher, attempt]);

  function retry(): void {
    setState({ status: "loading" });
    setAttempt((current) => current + 1);
  }

  return { state, retry };
}
