'use client';

import Link from 'next/link';
import { Download, ArrowRight, CheckSquare } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#0a0a0c] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <main className="w-full max-w-4xl relative z-10 flex flex-col items-center text-center">
        {/* Logo/Icon */}
        <div className="w-20 h-20 premium-gradient rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-500/20 mb-8 animate-bounce-slow">
          <CheckSquare className="text-white w-10 h-10" />
        </div>

        {/* Hero Text */}
        <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-6 tracking-tight">
          First-Claim <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text premium-gradient">Task System</span>
        </h1>
        
        <p className="text-white/50 text-lg sm:text-xl font-medium max-w-2xl mb-12 leading-relaxed">
          The fastest and fairest way to distribute tasks across your team. Receive real-time updates and claim work instantly before anyone else.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
          <Link 
            href="/login"
            className="w-full sm:w-auto glow-button premium-gradient text-white font-bold py-4 px-10 rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
          >
            <span>Login / Register</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <a 
            href="/ClaimTasks.apk"
            download="ClaimTasks.apk"
            className="w-full sm:w-auto glass-input text-white hover:bg-white/5 transition-colors font-bold py-4 px-10 rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
          >
            <span>Download App</span>
            <Download className="w-5 h-5 text-indigo-400" />
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-8 text-white/30 text-sm font-medium">
        © {new Date().getFullYear()} ClaimTasks Platform. All rights reserved.
      </footer>
    </div>
  );
}
