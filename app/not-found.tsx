import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="card text-center">
        <div className="text-sm uppercase tracking-[0.2em] text-cyan-400">404</div>
        <h1 className="mt-4 text-4xl font-black text-white">Page not found</h1>
        <p className="mt-3 text-slate-300">The page you requested does not exist.</p>
        <Link href="/" className="btn-primary mt-6">Back home</Link>
      </div>
    </main>
  );
}
