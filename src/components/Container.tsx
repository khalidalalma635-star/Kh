import Link from 'next/link';

export function Nav() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-2xl font-black text-cyan-400">KHALIDAI</Link>
        <nav className="flex gap-5 text-sm text-slate-300">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/chat">Chat</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/settings">Settings</Link>
        </nav>
      </div>
    </header>
  );
}
