'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-gray-50" style={{ paddingTop: '50px' }}>
        {children}
      </div>
    </div>
  );
} 