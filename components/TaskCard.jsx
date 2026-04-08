'use client';

import { Check, Clock, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import useTasks from '@/store/useTasks';

export default function TaskCard({ task, variant = 'available' }) {
  const { claimTask, markDone } = useTasks();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleClaim = async () => {
    setIsProcessing(true);
    setError('');
    const result = await claimTask(task._id);
    if (!result.success) {
      setError(result.error);
    }
    setIsProcessing(false);
  };

  const handleDone = async () => {
    setIsProcessing(true);
    await markDone(task._id);
    setIsProcessing(false);
  };

  const statusColors = {
    open: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    claimed: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    done: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
  };

  return (
    <div className="glass-card rounded-[2rem] p-6 transition-all duration-300 hover:shadow-indigo-500/10 group relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-indigo-500/20 transition-all"></div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColors[task.status]}`}>
          {task.status}
        </div>
        <div className="flex items-center gap-1.5 text-white/30 text-xs">
          <Clock className="w-3.5 h-3.5" />
          {new Date(task.createdAt).toLocaleDateString()}
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-indigo-400 transition-colors">
        {task.title}
      </h3>
      <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-2">
        {task.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
        {variant === 'available' && (
          <button
            onClick={handleClaim}
            disabled={isProcessing}
            className="w-full glow-button premium-gradient text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isProcessing ? 'Processing...' : (
              <>
                <span>Accept Task</span>
                <Check className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        )}

        {variant === 'my' && task.status === 'claimed' && (
          <button
            onClick={handleDone}
            disabled={isProcessing}
            className="w-full glow-button bg-white text-black font-bold py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {isProcessing ? 'Completing...' : (
              <>
                <span>Mark as Done</span>
                <Check className="w-4 h-4" />
              </>
            )}
          </button>
        )}

        {variant === 'admin' && (
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center gap-2 text-white/60 text-sm font-medium">
              <UserIcon className="w-4 h-4" />
              {task.status === 'open' && 'Not Accepted'}
              {task.status === 'claimed' && `Accepted by ${task.claimedBy?.name || 'Unknown'}`}
              {task.status === 'done' && `Completed by ${task.claimedBy?.name || 'Unknown'}`}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 text-red-400 text-xs font-medium text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
          {error}
        </div>
      )}
    </div>
  );
}
