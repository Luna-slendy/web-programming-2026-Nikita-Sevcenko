
function Resources() {
  return (
    <aside className="rounded-2xl border border-[#e5e9f2] bg-white p-5">
      <h2 className="m-0 text-base font-bold">Useful links</h2>

      <div className="mt-4 grid gap-3">
        <a
          className="rounded-xl border border-[#e5e9f2] p-3 text-sm font-semibold hover:bg-[#f8fafc]"
          href="#"
        >
          Course materials →
        </a>

        <a
          className="rounded-xl border border-[#e5e9f2] p-3 text-sm font-semibold hover:bg-[#f8fafc]"
          href="#"
        >
          Submission guide →
        </a>
      </div>

      <div className="mt-5 rounded-xl border border-[#f3e4b6] bg-[#fff8e8] p-4">
        <p className="m-0 text-xs font-bold text-[#9a6c16]">Tip</p>
        <p className="mb-0 mt-2 text-xs leading-5 text-[#735d34]">
          Check your progress regularly and plan ahead for deadlines.
        </p>
      </div>
    </aside>
  );
}

export default Resources;
