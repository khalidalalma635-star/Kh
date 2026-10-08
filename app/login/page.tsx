import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="text-3xl font-black text-cyan-400">KHALIDAI</div>
          <p className="mt-2 text-sm text-slate-400">Secure sign in</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Email</label>
            <input className="input" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Password</label>
            <input className="input" type="password" placeholder="••••••••" />
          </div>
          <button type="submit" className="btn-primary w-full">Sign In</button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Need an account? <Link href="/" className="text-cyan-400">Back home</Link>
        </div>
      </div>
    </main>
  );
}
