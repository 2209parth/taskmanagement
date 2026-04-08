'use client';

import useAuth from '@/store/useAuth';
import { LogOut, User, CheckSquare } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto bw-card rounded-2xl px-6 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow group-hover:rotate-6 transition-transform">
            <CheckSquare className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-black hidden sm:block">ClaimTasks</span>
        </Link>

        {user && (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                <User className="text-black w-4 h-4" />
              </div>
              <div className="text-sm hidden sm:block">
                <p className="text-gray-500 text-[10px] uppercase tracking-wider font-semibold">Logged in as</p>
                <p className="text-black font-medium leading-tight">{user.name}</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-2 transition-colors duration-200"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-gray-400 hover:text-red-600" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
