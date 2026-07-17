import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-semibold tracking-tight">404</h1>
      <p className="mt-4 text-lg text-black/60">
        This page doesn't exist.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Go home
      </Link>
    </main>
  );
}