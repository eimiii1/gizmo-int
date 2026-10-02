import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Invalid email or password");
      // TODO: save token / redirect
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0b] px-4 text-zinc-50">
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-[120px]" />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-black/50 backdrop-blur-xl"
      >
        <div className="mb-6 h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-600" />

        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-1 mb-8 text-sm text-zinc-500">Log in to continue</p>

        <label className="mb-4 block">
          <span className="mb-1.5 block text-xs font-medium text-zinc-400">
            Email
          </span>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-600 outline-none transition focus:border-white/30 focus:bg-white/[0.06] focus:ring-4 focus:ring-white/5"
          />
        </label>

        <label className="mb-6 block">
          <span className="mb-1.5 block text-xs font-medium text-zinc-400">
            Password
          </span>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-600 outline-none transition focus:border-white/30 focus:bg-white/[0.06] focus:ring-4 focus:ring-white/5"
          />
        </label>

        {error && (
          <p className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-zinc-50 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-white active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        <p className="mt-6 text-center text-sm text-zinc-500">
          No account?{" "}
          <a href="#" className="text-zinc-300 transition hover:text-white">
            Sign up
          </a>
        </p>
      </form>
    </main>
  );
}