
interface FooterProps {
  note: string;
}

function Footer({ note }: FooterProps) {
  return (
    <footer className="border-t border-[#e5e9f2] bg-white">
      <div className="mx-auto flex min-h-[74px] max-w-[1180px] flex-col justify-center gap-2 px-5 py-4 text-[11px] text-[#6c7485] sm:flex-row sm:items-center sm:justify-between">
        <span>CampusFlow · Web Programming</span>
        <span>{note}</span>
      </div>
    </footer>
  );
}

export default Footer;
