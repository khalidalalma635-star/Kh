import { Nav } from '@/components/Nav';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <Nav />
      {children}
    </div>
  );
}
