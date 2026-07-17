"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

interface GeneratedPosts {
  linkedin?: string;
  twitter?: string;
  instagram?: string;
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professional");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<GeneratedPosts | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function linked directly to backend Next.js Router Endpoint
  async function handlePostGeneration(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, tone }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong.");
      }

      const data: GeneratedPosts = await response.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during creation.");
    } finally {
      setLoading(false);
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-slate-400">
        Authenticating session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Platform Dashboard Navbar */}
      <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900/50 px-6 backdrop-blur-md">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-lg font-bold text-white flex items-center space-x-2">
            <span className="bg-indigo-600 px-2 py-0.5 rounded text-sm text-white">S</span>
            <span className="hidden sm:inline">SocialSphere Workspace</span>
          </Link>
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold border-l border-slate-800 pl-6">Production Studio</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs text-slate-400 font-medium">
            {user?.primaryEmailAddress?.emailAddress}
          </span>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column - Input Panel Form */}
        <section className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">⚡ Post For Me</h2>
            <p className="text-xs text-slate-400 mb-6">Enter a topic or outline. Our backend endpoint communicates with Gemini directly to synthesize optimized campaigns.</p>

            <form onSubmit={handlePostGeneration} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Campaign Subject / Topic</label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., An educational breakdown comparing PostgreSQL and Supabase for real-time applications"
                  rows={4}
                  required
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 p-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition placeholder:text-slate-600 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Tone of Voice</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 p-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
                >
                  <option value="professional">💼 Professional & Analytical</option>
                  <option value="hype">🔥 Hype / Launch Mode</option>
                  <option value="creative">🎨 Creative & Storyteller</option>
                  <option value="casual">☕ Casual & Friendly</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full relative rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition"
              >
                {loading ? "Wrangling Backend AI..." : "Generate Cross-Platform Campaign"}
              </button>
            </form>
          </div>

          <div className="pt-6 border-t border-slate-800 mt-6 flex items-center justify-between text-xs text-slate-500">
            <span>Status: Connected to Endpoint</span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
          </div>
        </section>

        {/* Right Column - Response & Results Panel */}
        <section className="lg:col-span-7 flex flex-col space-y-6">
          {error && (
            <div className="p-4 rounded-xl border border-rose-900 bg-rose-950/20 text-rose-300 text-sm">
              <span className="font-bold">Backend Error:</span> {error}
            </div>
          )}

          {!results && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-2xl p-12 text-center text-slate-500">
              <div className="text-4xl mb-4">✍️</div>
              <p className="text-sm">No campaign generated yet.</p>
              <p className="text-xs text-slate-600 mt-1">Provide a prompt and click the button to generate and view the structured output.</p>
            </div>
          )}

          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center border border-slate-800 bg-slate-900/20 rounded-2xl p-12 text-center text-slate-400">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mb-4" />
              <p className="text-sm">Contacting Gemini Backend...</p>
              <p className="text-xs text-slate-500 mt-1">Parsing and structuring social content.</p>
            </div>
          )}

          {results && (
            <div className="flex-grow space-y-6">
              <h3 className="text-lg font-bold text-slate-200">Generated Campaign Contents</h3>

              {/* LinkedIn Output */}
              {results.linkedin && (
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-indigo-500" /> LinkedIn Copy
                    </span>
                    <button
                      onClick={() => navigator.clipboard.writeText(results.linkedin || "")}
                      className="text-xs text-slate-400 hover:text-white transition"
                    >
                      Copy Content
                    </button>
                  </div>
                  <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                    {results.linkedin}
                  </pre>
                </div>
              )}

              {/* Twitter Output */}
              {results.twitter && (
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                    <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-sky-500" /> Twitter / X Copy
                    </span>
                    <span className="text-xs text-slate-500">
                      {results.twitter.length} / 280 Chars
                    </span>
                  </div>
                  <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                    {results.twitter}
                  </pre>
                </div>
              )}

              {/* Instagram Output */}
              {results.instagram && (
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                    <span className="text-xs font-semibold text-pink-400 uppercase tracking-wider flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-pink-500" /> Instagram Caption
                    </span>
                    <button
                      onClick={() => navigator.clipboard.writeText(results.instagram || "")}
                      className="text-xs text-slate-400 hover:text-white transition"
                    >
                      Copy Content
                    </button>
                  </div>
                  <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                    {results.instagram}
                  </pre>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}