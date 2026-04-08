'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import TaskCard from '@/components/TaskCard';
import useTasks from '@/store/useTasks';
import { Plus, BarChart3, ListTodo, Send } from 'lucide-react';

export default function AdminDashboard() {
  const { adminTasks, fetchAdminTasks, createTask } = useTasks();
  const [form, setForm] = useState({ title: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchAdminTasks();
  }, [fetchAdminTasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await createTask(form.title, form.description);
    if (res.success) {
      setForm({ title: '', description: '' });
    }
    setIsSubmitting(false);
  };

  const totalTasks = adminTasks.length;
  const openTasks = adminTasks.filter(t => t.status === 'open').length;
  const claimedTasks = adminTasks.filter(t => t.status === 'claimed').length;
  const doneTasks = adminTasks.filter(t => t.status === 'done').length;

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Stats & Create Form */}
        <div className="lg:col-span-4 space-y-8">
          {/* Stats Bar */}
          <div className="bw-card rounded-[2.5rem] p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="text-black w-5 h-5" />
              <h2 className="text-xl font-bold text-black tracking-tight">System Overview</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="stat-card rounded-2xl p-4">
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Total</p>
                <p className="text-2xl font-bold text-black">{totalTasks}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Open</p>
                <p className="text-2xl font-bold text-black">{openTasks}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Active</p>
                <p className="text-2xl font-bold text-black">{claimedTasks}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Done</p>
                <p className="text-2xl font-bold text-black">{doneTasks}</p>
              </div>
            </div>
          </div>

          {/* Create Task Form */}
          <div className="bw-card rounded-[2.5rem] p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Plus className="text-black w-5 h-5" />
              <h2 className="text-xl font-bold text-black tracking-tight">Create New Task</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                className="w-full bw-input rounded-xl py-4 px-5 text-black focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Task Description"
                rows="4"
                className="w-full bw-input rounded-xl py-4 px-5 text-black focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm resize-none"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bw-button text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
              >
                {isSubmitting ? 'Creating...' : (
                  <>
                    <span>Publish Task</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: All Tasks List */}
        <div className="lg:col-span-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200">
              <ListTodo className="text-gray-500 w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-black tracking-tight">Master Task List</h2>
          </div>

          {adminTasks.length === 0 ? (
            <div className="bw-card rounded-[2.5rem] p-20 text-center border-dashed border-gray-200">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No tasks created yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adminTasks.map(task => (
                <TaskCard key={task._id} task={task} variant="admin" />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
