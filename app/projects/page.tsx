export default function ChatPage() {
  return (
    <main className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-sm uppercase tracking-[0.2em] text-cyan-400">AI Chat</div>
          <h1 className="mt-2 text-3xl font-black text-white">Conversation</h1>
        </div>
      </div>

      <div className="card min-h-[500px] p-0 overflow-hidden">
        <div className="border-b border-slate-800 p-4 text-slate-300">Conversation #124</div>
        <div className="space-y-5 p-5">
          <div className="max-w-xl rounded-2xl bg-slate-800 p-4 text-slate-100">
            Can you help me create a product launch plan for a B2B AI assistant?
          </div>
          <div className="ml-auto max-w-xl rounded-2xl bg-cyan-600 p-4 text-white">
            Yes — I can help define the positioning, rollout phases, and customer engagement loop.
          </div>
        </div>

        <div className="border-t border-slate-800 p-4">
          <div className="flex gap-3">
            <input className="input" placeholder="Ask KHALIDAI anything..." />
            <button className="btn-primary">Send</button>
          </div>
        </div>
      </div>
    </main>
  );
}
