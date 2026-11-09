
type StatTone = "neutral" | "positive" | "danger";

interface StatCardProps {
  index: string;
  label: string;
  value: string;
  note: string;
  tone?: StatTone;
}

const toneClasses: Record<StatTone, string> = {
  neutral: "text-[#6c7485]",
  positive: "text-[#16845b]",
  danger: "text-[#d64545]",
};

function StatCard({
  index,
  label,
  value,
  note,
  tone = "neutral",
}: StatCardProps) {
  return (
    <article className="rounded-[18px] border border-[#e5e9f2] bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-bold text-[#6c7485]">
          {label}
        </span>
        <span className="text-xs font-extrabold text-primary">
          {index}
        </span>
      </div>

      <p className="mb-0 mt-5 text-3xl font-extrabold tracking-tight">
        {value}
      </p>

      <p className={`mb-0 mt-2 text-xs ${toneClasses[tone]}`}>
        {note}
      </p>
    </article>
  );
}

export default StatCard;
