const stats = [
  { label: 'Conversations', value: '128' },
  { label: 'Active Projects', value: '14' },
  { label: 'Files Processed', value: '42' },
  { label: 'Avg. Response', value: '1.2s' }
];

export default function DashboardPage() {
  return (
    <main className="container py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="text-sm uppercase tracking-[0.2em] text-cyan-400">Dashboard</div>
          <h1 className="mt-2 text-3xl font-black text-white">Welcome back</h1>
        </div>
        <button className="btn-primary">New Chat</button>
      </div>

      <div className="grid-2 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <div className="text-sm text-slate-400">{stat.label}</div>
            <div className="mt-3 text-3xl font-black text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid-2">
        <div className="card">
          <div className="text-xl font-bold text-white">Recent Activity</div>
          <ul className="mt-5 space-y-4 text-slate-300">
            <li>• AI review completed for marketing strategy doc.</li>
            <li>• New memory entry stored for project onboarding.</li>
            <li>• PR summarization generated successfully.</li>
          </ul>
        </div>

        <div className="card">
          <div className="text-xl font-bold text-white">System Health</div>
          <ul className="mt-5 space-y-4 text-slate-300">
            <li>• Database: healthy</li>
            <li>• AI Provider: configured</li>
            <li>• Auth: active</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
