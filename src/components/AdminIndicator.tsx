'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Shield, LogOut, LayoutDashboard } from 'lucide-react';
import { checkAdminSession, clearAdminSession } from '@/lib/adminAuth';

export default function AdminIndicator() {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsAdmin(checkAdminSession());
  }, [pathname]);

  const handleLogout = () => {
    clearAdminSession();
    setIsAdmin(false);
    router.push('/');
  };

  const goToDashboard = () => {
    router.push('/voltherm-admin/dashboard');
  };

  if (!isAdmin || pathname?.startsWith('/voltherm-admin')) {
    return null;
  }

  return (
    <div className='fixed bottom-4 right-4 z-50 flex flex-col gap-2'>
      {/* Admin Badge */}
      <div className='bg-linear-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse'>
        <Shield className='w-4 h-4' />
        <span className='text-sm font-medium'>Admin Mode</span>
      </div>

      {/* Quick Actions */}
      <div className='bg-white rounded-lg shadow-xl border border-slate-200 p-2 space-y-1'>
        <button
          onClick={goToDashboard}
          className='w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors'
          title='Go to Dashboard'
        >
          <LayoutDashboard className='w-4 h-4' />
          <span>Dashboard</span>
        </button>
        <button
          onClick={handleLogout}
          className='w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors'
          title='Logout from Admin'
        >
          <LogOut className='w-4 h-4' />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
