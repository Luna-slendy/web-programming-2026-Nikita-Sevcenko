
import { useState } from "react";

interface HeaderProps {
  userName: string;
  userInitials: string;
  course: string;
}

function Header({
  userName,
  userInitials,
  course,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-[#e5e9f2] bg-white">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 py-4">
        <a
          href="#"
          className="text-xl font-extrabold text-primary"
          aria-label="CampusFlow home"
        >
          CampusFlow
        </a>

        <button
          type="button"
          className="rounded-lg border px-3 py-2 md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? "Close menu" : "Menu"}
        </button>

        <nav
          id="main-navigation"
          className={`${isMenuOpen ? "flex" : "hidden"} absolute left-0 top-16 z-10 w-full flex-col gap-4 border-b bg-white p-5 md:static md:flex md:w-auto md:flex-row md:items-center md:border-0 md:p-0`}
        >
          <a href="#overview" onClick={() => setIsMenuOpen(false)}>
            Overview
          </a>
          <a href="#projects" onClick={() => setIsMenuOpen(false)}>
            Projects
          </a>
          <a href="#deadlines" onClick={() => setIsMenuOpen(false)}>
            Deadlines
          </a>
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <span className="grid size-10 place-items-center rounded-full bg-[#f0edff] font-bold text-primary">
            {userInitials}
          </span>
          <div>
            <p className="m-0 text-sm font-bold">{userName}</p>
            <p className="m-0 text-xs text-[#6c7485]">{course}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
