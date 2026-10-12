
import type { Deadline, LoadState } from "../types";
import DeadlineItem from "./DeadlineItem";
import { LoadingBox, ErrorBox, EmptyBox } from "./StateBox";

interface DeadlineSectionProps {
  state: LoadState<Deadline[]>;
  onRetry: () => void;
}

function DeadlineSection({ state, onRetry }: DeadlineSectionProps) {
  if (state.status === "loading") {
    return <LoadingBox text="Loading deadlines…" />;
  }

  if (state.status === "error") {
    return <ErrorBox message={state.error} onRetry={onRetry} />;
  }

  if (state.data.length === 0) {
    return (
      <EmptyBox
        title="No upcoming deadlines"
        text="You are all caught up."
      />
    );
  }

  return (
    <div className="grid gap-3">
      {state.data.map((deadline) => (
        <DeadlineItem
          key={`${deadline.title}-${deadline.date}-${deadline.time}`}
          deadline={deadline}
        />
      ))}
    </div>
  );
}

export default DeadlineSection;
