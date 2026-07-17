import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Header */}
      <header className="relative z-10 mx-auto max-w-7xl px-6 py-6 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">S</div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">SocialSphere</span>
        </div>

        <div>
          <SignedIn>
            <Link href="/dashboard" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition">
              Go to Dashboard
            </Link>
          </SignedIn>
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition">
                Get Started Free
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
          Your Entire Social Media Strategy, <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Fueled by GenAI.</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
          Draft optimized, highly engagement-focused social media campaigns across X, LinkedIn, and Instagram in seconds. Hand the writing over to your personal AI backend.
        </p>

        <div className="flex justify-center gap-4">
          <SignedIn>
            <Link href="/dashboard" className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-indigo-500/25 hover:opacity-90 transition">
              Enter Platform Dashboard
            </Link>
          </SignedIn>
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-indigo-500/25 hover:opacity-90 transition">
                Create Free Account
              </button>
            </SignUpButton>
          </SignedOut>
        </div>

        {/* Feature Highlights */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-2">🚀 Instant AI Generation</h3>
            <p className="text-slate-400 text-sm">Powered by Gemini models to craft copy tailored dynamically to each network's constraints.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-2">🔒 Secure OAuth</h3>
            <p className="text-slate-400 text-sm">Enterprise-grade registration flow and session management provided seamlessly via Clerk Auth.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-2">⚙️ Direct Backend Pipeline</h3>
            <p className="text-slate-400 text-sm">Custom API endpoint layer communicating secure tokens to write, parse, and plan your next campaign.</p>
          </div>
        </section>
      </main>
    </div>
  );
}