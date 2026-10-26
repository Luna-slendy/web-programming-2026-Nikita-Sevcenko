
interface LoadingBoxProps {
  text: string;
}

interface ErrorBoxProps {
  message: string;
  onRetry: () => void;
}

interface EmptyBoxProps {
  title: string;
  text: string;
}

export function LoadingBox({ text }: LoadingBoxProps) {
  return (
    <p
      className="rounded-xl border border-[#e5e9f2] bg-white p-5 text-sm text-[#6c7485]"
      role="status"
    >
      {text}
    </p>
  );
}

export function ErrorBox({ message, onRetry }: ErrorBoxProps) {
  return (
    <div
      className="rounded-xl border border-red-200 bg-red-50 p-5"
      role="alert"
    >
      <p className="m-0 text-sm text-red-700">{message}</p>
      <button
        type="button"
        className="mt-3 rounded-lg bg-white px-4 py-2 text-sm font-bold text-red-700 ring-1 ring-red-200 hover:bg-red-100"
        onClick={onRetry}
      >
        Try again
      </button>
    </div>
  );
}

export function EmptyBox({ title, text }: EmptyBoxProps) {
  return (
    <div className="rounded-xl border border-dashed border-[#e5e9f2] p-6 text-center">
      <h3 className="m-0 text-base font-bold">{title}</h3>
      <p className="mb-0 mt-2 text-sm text-[#6c7485]">{text}</p>
    </div>
  );
}
