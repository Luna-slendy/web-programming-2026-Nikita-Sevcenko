
function Hero() {
  return (
    <section className="grid gap-6 py-8 md:grid-cols-[1fr_auto] md:items-center">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary">
          YOUR LEARNING SPACE
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          Your workspace
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#6c7485]">
          Keep track of your projects, deadlines, and progress in one place.
        </p>
      </div>

      <aside className="rounded-2xl border border-[#f3e4b6] bg-[#fff8e8] p-5">
        <p className="m-0 text-xs font-extrabold text-[#9a6c16]">
          THIS WEEK
        </p>
        <p className="mb-0 mt-2 text-sm text-[#735d34]">
          Review your current projects and upcoming deadlines.
        </p>
      </aside>
    </section>
  );
}

export default Hero;
