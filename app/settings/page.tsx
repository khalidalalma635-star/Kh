const projects = [
  { name: 'Revenue AI Workflow', status: 'Active' },
  { name: 'Customer Support Copilot', status: 'Review' },
  { name: 'File Analysis Suite', status: 'Draft' }
];

export default function ProjectsPage() {
  return (
    <main className="container py-10">
      <div className="mb-6">
        <div className="text-sm uppercase tracking-[0.2em] text-cyan-400">Projects</div>
        <h1 className="mt-2 text-3xl font-black text-white">Active workspaces</h1>
      </div>

      <div className="space-y-5">
        {projects.map((project) => (
          <div key={project.name} className="card flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-white">{project.name}</div>
              <div className="mt-2 text-sm text-slate-400">Updated recently</div>
            </div>
            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
              {project.status}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
