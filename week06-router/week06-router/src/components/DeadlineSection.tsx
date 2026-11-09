import type { Deadline, LoadState } from "../types";
import DeadlineItem from "./DeadlineItem";
import { LoadingBox, ErrorBox, EmptyBox } from "./StateBox";

interface DeadlineSectionProps {
  state: LoadState<Deadline[]>;
  onRetry: () => void;
  limit?: number;
}

function DeadlineSection({
  state,
  onRetry,
  limit,
}: DeadlineSectionProps) {
  if (state.status === "loading") {
    return <LoadingBox text="Loading deadlines…" />;
  }

  if (state.status === "error") {
    return <ErrorBox message={state.error} onRetry={onRetry} />;
  }

  const deadlines =
    limit === undefined ? state.data : state.data.slice(0, limit);

  if (deadlines.length === 0) {
    return (
      <EmptyBox
        title="No upcoming deadlines"
        text="You are all caught up."
      />
    );
  }

  return (
    <div className="grid gap-3">
      {deadlines.map((deadline) => (
        <DeadlineItem
          key={`${deadline.title}-${deadline.date}-${deadline.time}`}
          deadline={deadline}
        />
      ))}
    </div>
  );
}

export default DeadlineSection;
