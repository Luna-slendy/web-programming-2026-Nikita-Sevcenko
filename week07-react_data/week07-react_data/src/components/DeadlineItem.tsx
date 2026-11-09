
import type { Deadline } from "../types";

interface DeadlineItemProps {
  deadline: Deadline;
}

function DeadlineItem({ deadline }: DeadlineItemProps) {
  return (
    <article className="rounded-xl border border-[#e5e9f2] bg-white p-4">
      <h3 className="m-0 font-bold">{deadline.title}</h3>
      <p className="mb-0 mt-2 text-sm text-[#6c7485]">
        {deadline.course} · {deadline.date} · {deadline.time}
      </p>
    </article>
  );
}

export default DeadlineItem;
