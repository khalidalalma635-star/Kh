import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="shell">
      <header className="border-b border-slate-800 bg-slate-950/80">
        <div className="container flex items-center justify-between py-5">
          <div className="text-2xl font-bold text-cyan-400">KHALIDAI</div>
          <nav className="hidden gap-5 text-sm text-slate-300 md:flex">
            <Link href="#features">Features</Link>
            <Link href="#security">Security</Link>
            <Link href="#pricing">Pricing</Link>
          </nav>
          <div className="flex gap-3">
            <Link href="/login" className="btn-ghost">Login</Link>
            <Link href="/dashboard" className="btn-primary">Launch App</Link>
          </div>
        </div>
      </header>

      <section className="container py-20">
        <div className="grid-2 items-center gap-8">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-300">
              Production Ready AI Platform
            </div>
            <h1 className="text-5xl font-black leading-tight text-white md:text-6xl">
              Build with real AI workflows. <span className="text-cyan-400">Ship safely.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              KHALIDAI gives teams a secure AI workspace for conversations, memory, file analysis, and real operational automation.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/dashboard" className="btn-primary">Open Dashboard</Link>
              <Link href="/chat" className="btn-ghost">Try Chat</Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-300">
              <div>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div>Availability target</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div>Operational</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">SOC 2</div>
                <div>Ready posture</div>
              </div>
            </div>
          </div>

          <div className="card shadow-glow">
            <div className="mb-4 flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Workspace Status</div>
                <div className="mt-2 text-xl font-bold text-white">System Healthy</div>
              </div>
              <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">OK</div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl bg-slate-900/80 p-4">
                <div className="text-xs text-slate-400">AI Service</div>
                <div className="mt-2 flex justify-between text-white"><span>OpenAI</span><span className="text-emerald-400">Configured</span></div>
              </div>
              <div className="rounded-xl bg-slate-900/80 p-4">
                <div className="text-xs text-slate-400">Database</div>
                <div className="mt-2 flex justify-between text-white"><span>PostgreSQL</span><span className="text-emerald-400">Ready</span></div>
              </div>
              <div className="rounded-xl bg-slate-900/80 p-4">
                <div className="text-xs text-slate-400">Security</div>
                <div className="mt-2 flex justify-between text-white"><span>Auth + Isolation</span><span className="text-emerald-400">On</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="container py-20">
        <div className="mb-10 text-center">
          <div className="text-sm uppercase tracking-[0.25em] text-cyan-400">Core Features</div>
          <h2 className="mt-4 text-4xl font-black text-white">Built for real product usage</h2>
        </div>

        <div className="grid-2 gap-6">
          <div className="card">
            <div className="text-xl font-bold text-white">AI Chat</div>
            <p className="mt-3 text-slate-300">Secure, context-aware conversations with provider-based LLM integration.</p>
          </div>
          <div className="card">
            <div className="text-xl font-bold text-white">File Analysis</div>
            <p className="mt-3 text-slate-300">Upload documents, analyze them, and use them in workflows without leaking secrets.</p>
          </div>
          <div className="card">
            <div className="text-xl font-bold text-white">Projects & Memory</div>
            <p className="mt-3 text-slate-300">Keep context across project work and preserve memory for better continuity.</p>
          </div>
          <div className="card">
            <div className="text-xl font-bold text-white">Tools & RAG</div>
            <p className="mt-3 text-slate-300">Use retrieval, tool execution, and custom data flows for intelligent operations.</p>
          </div>
        </div>
      </section>

      <section id="security" className="container py-20">
        <div className="card">
          <div className="mb-6 text-center">
            <div className="text-sm uppercase tracking-[0.25em] text-cyan-400">Security</div>
            <h2 className="mt-4 text-3xl font-black text-white">Security-first by design</h2>
          </div>
          <div className="grid-2 gap-6 text-slate-300">
            <ul className="space-y-3">
              <li>• Authentication enforced</li>
              <li>• Authorization per resource</li>
              <li>• Input validation and sanitization</li>
              <li>• Secure headers and CORS policy</li>
            </ul>
            <ul className="space-y-3">
              <li>• Prompt injection awareness</li>
              <li>• SSRF / XSS / SQL injection prevention</li>
              <li>• Rate limiting and audit logging</li>
              <li>• Secrets stored in environment variables</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-slate-400">
        © 2026 KHALIDAI. Production-grade AI platform.
      </footer>
    </main>
  );
}
