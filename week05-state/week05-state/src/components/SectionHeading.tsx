
interface SectionHeadingProps {
  eyebrow: string;
  title: string;
}

function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <>
      <p className="text-xs font-extrabold tracking-widest text-primary">
        {eyebrow}
      </p>
      <h2 className="mb-5 mt-2 text-2xl font-bold">{title}</h2>
    </>
  );
}

export default SectionHeading;
