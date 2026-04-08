'use client';

import useAuth from '@/store/useAuth';
import { LogOut, User, CheckSquare } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto glass-card rounded-2xl px-6 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
            <CheckSquare className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block">ClaimTasks</span>
        </Link>

        {user && (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                <User className="text-indigo-400 w-4 h-4" />
              </div>
              <div className="text-sm hidden sm:block">
                <p className="text-white/40 text-[10px] uppercase tracking-wider font-semibold">Logged in as</p>
                <p className="text-white font-medium leading-tight">{user.name}</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-2 transition-colors duration-200"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-white/40 hover:text-red-400" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
