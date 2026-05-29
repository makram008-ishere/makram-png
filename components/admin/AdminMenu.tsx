import Link from 'next/link';

const menuItems = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Posts', href: '/admin/posts' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Designs', href: '/admin/designs' },
];

export function AdminMenu() {
  return (
    <aside className="rounded-3xl border border-border bg-panel p-6 shadow-glow md:w-72">
      <p className="text-sm uppercase tracking-[0.3em] text-accent">Admin Panel</p>
      <div className="mt-6 space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-2xl border border-transparent px-4 py-3 text-sm text-white transition hover:border-accent/30 hover:bg-accent/5"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
