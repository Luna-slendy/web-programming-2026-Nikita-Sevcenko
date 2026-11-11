import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return (
    <div className="flex min-h-dvh flex-col">
      <Header
        userName="Alex Student"
        userInitials="AZ"
        course="Web Programming"
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer note="Week 7 — React Data" />
    </div>
  );
}

export default Layout;
