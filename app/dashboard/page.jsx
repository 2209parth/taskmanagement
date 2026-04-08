'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TaskCard from '@/components/TaskCard';
import useTasks from '@/store/useTasks';
import { LayoutGrid, CheckCircle, RefreshCcw } from 'lucide-react';

export default function MemberDashboard() {
  const { openTasks, myTasks, fetchOpenTasks, fetchMyTasks, startPolling } = useTasks();

  useEffect(() => {
    fetchOpenTasks();
    fetchMyTasks();
    const stopPolling = startPolling();
    return () => stopPolling();
  }, [fetchOpenTasks, fetchMyTasks, startPolling]);

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0c]">
      <Navbar />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Available Tasks Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <LayoutGrid className="text-indigo-400 w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Available Tasks</h2>
            </div>
            <div className="flex items-center gap-2 text-white/30 text-xs font-semibold uppercase tracking-widest glass-pill px-3 py-1.5 rounded-full">
              <RefreshCcw className="w-3 h-3 animate-spin-slow" />
              Live Updates
            </div>
          </div>

          {openTasks.length === 0 ? (
            <div className="glass-card rounded-[2rem] p-12 text-center border-dashed border-white/10">
              <p className="text-white/30 font-medium">No tasks available at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {openTasks.map(task => (
                <TaskCard key={task._id} task={task} variant="available" />
              ))}
            </div>
          )}
        </section>

        {/* My Tasks Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <CheckCircle className="text-emerald-400 w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">My Claimed Tasks</h2>
          </div>

          {myTasks.length === 0 ? (
            <div className="glass-card rounded-[2rem] p-12 text-center border-dashed border-white/10">
              <p className="text-white/30 font-medium">You haven't claimed any tasks yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myTasks.map(task => (
                <TaskCard key={task._id} task={task} variant="my" />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
