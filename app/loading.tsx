export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-400"></div>
        <p className="mt-4 text-slate-300">Loading...</p>
      </div>
    </main>
  );
}
