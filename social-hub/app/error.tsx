"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="mt-4 text-lg text-black/60">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={reset}
        className="btn-primary mt-8"
      >
        Try again
      </button>
    </main>
  );
}