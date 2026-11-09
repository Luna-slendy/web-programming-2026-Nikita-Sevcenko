import { Link, useLocation } from "react-router";

function NotFoundPage() {
  const location = useLocation();

  return (
    <div className="mx-auto flex min-h-[60vh] w-[calc(100%-28px)] max-w-[1180px] flex-col items-center justify-center py-12 text-center sm:w-[calc(100%-40px)]">
      <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-primary">
        ERROR 404
      </p>

      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">
        Page not found
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-[#6c7485]">
        The page you are looking for does not exist or may have been moved.
      </p>

      <p className="mt-4 rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-600">
        Requested path: {location.pathname}
      </p>

      <Link
        to="/"
        className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
      >
        Back to dashboard
      </Link>
    </div>
  );
}

export default NotFoundPage;