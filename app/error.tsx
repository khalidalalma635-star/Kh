export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="card max-w-md text-center">
        <div className="text-sm uppercase tracking-[0.2em] text-red-400">Error</div>
        <h1 className="mt-4 text-2xl font-black text-white">Something went wrong</h1>
        <p className="mt-3 text-slate-300">An unexpected error occurred. Please try again.</p>
        <button onClick={() => reset()} className="btn-primary mt-6">
          Try again
        </button>
      </div>
    </main>
  );
}
