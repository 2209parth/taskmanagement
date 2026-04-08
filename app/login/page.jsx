'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/store/useAuth';
import { Mail, Lock, User, ArrowRight, CheckSquare } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  
  const router = useRouter();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        if (isLogin) {
          setUser(data.user);
          router.push(data.user.role === 'admin' ? '/admin' : '/dashboard');
        } else {
          setIsLogin(true);
          setError('Account created! Please login.');
        }
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0a0c] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/10 blur-[100px] rounded-full"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="mb-10 text-center">
          <div className="w-16 h-16 premium-gradient rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 mx-auto mb-6">
            <CheckSquare className="text-white w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Join the System'}
          </h1>
          <p className="text-white/40 font-medium">
            {isLogin ? 'Enter your details to access your tasks.' : 'Create an account to start claiming tasks.'}
          </p>
        </div>

        <div className="glass-card rounded-[2.5rem] p-8 sm:p-10 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <User className="text-white/20 w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full glass-input rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Mail className="text-white/20 w-5 h-5" />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full glass-input rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Lock className="text-white/20 w-5 h-5" />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="w-full glass-input rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            {error && <p className="text-red-400 text-sm font-medium text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full glow-button premium-gradient text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 mt-6 uppercase tracking-widest text-sm"
            >
              {loading ? 'Processing...' : (
                <>
                  <span>{isLogin ? 'Login Now' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-white/40 hover:text-white transition-colors text-sm font-medium"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
