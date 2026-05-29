import { ReactNode } from 'react';
import { AdminMenu } from '@/components/admin/AdminMenu';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 lg:flex-row lg:items-start lg:gap-8">
        <AdminMenu />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
