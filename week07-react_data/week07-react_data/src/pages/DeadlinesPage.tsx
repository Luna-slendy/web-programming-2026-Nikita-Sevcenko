
import DeadlineSection from "../components/DeadlineSection";
import SectionHeading from "../components/SectionHeading";
import type { Deadline, LoadState } from "../types";

interface DeadlinesPageProps {
  deadlines: LoadState<Deadline[]>;
  onRetry: () => void;
}

function DeadlinesPage({
  deadlines,
  onRetry,
}: DeadlinesPageProps) {
  return (
    <div className="mx-auto w-[calc(100%-28px)] max-w-[1180px] py-6 sm:w-[calc(100%-40px)]">
      <section className="mt-2">
        <SectionHeading
          eyebrow="DEADLINES"
          title="All deadlines"
        />

        <DeadlineSection
          state={deadlines}
          onRetry={onRetry}
        />
      </section>
    </div>
  );
}

export default DeadlinesPage;
