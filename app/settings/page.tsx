export default function SettingsPage() {
  return (
    <main className="container py-10">
      <div className="mb-6">
        <div className="text-sm uppercase tracking-[0.2em] text-cyan-400">Settings</div>
        <h1 className="mt-2 text-3xl font-black text-white">Account & system</h1>
      </div>

      <div className="grid-2 gap-6">
        <div className="card">
          <div className="text-xl font-bold text-white">Profile</div>
          <div className="mt-5 space-y-4">
            <input className="input" placeholder="Full name" />
            <input className="input" placeholder="Email" />
            <button className="btn-primary">Save profile</button>
          </div>
        </div>

        <div className="card">
          <div className="text-xl font-bold text-white">Security</div>
          <div className="mt-5 space-y-4">
            <input className="input" type="password" placeholder="Current password" />
            <input className="input" type="password" placeholder="New password" />
            <button className="btn-primary">Update password</button>
          </div>
        </div>
      </div>
    </main>
  );
}
