import { create } from 'zustand';

const useTasks = create((set, get) => ({
  openTasks: [],
  myTasks: [],
  adminTasks: [],
  isLoading: false,

  fetchOpenTasks: async () => {
    try {
      const res = await fetch('/api/tasks/open');
      if (res.ok) {
        const data = await res.json();
        set({ openTasks: data });
      }
    } catch (error) {
      console.error('Failed to fetch open tasks:', error);
    }
  },

  fetchMyTasks: async () => {
    try {
      const res = await fetch('/api/tasks/my');
      if (res.ok) {
        const data = await res.json();
        set({ myTasks: data });
      }
    } catch (error) {
      console.error('Failed to fetch my tasks:', error);
    }
  },

  fetchAdminTasks: async () => {
    try {
      const res = await fetch('/api/tasks');
      if (res.ok) {
        const data = await res.json();
        set({ adminTasks: data });
      }
    } catch (error) {
      console.error('Failed to fetch admin tasks:', error);
    }
  },

  claimTask: async (taskId) => {
    try {
      const res = await fetch('/api/tasks/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId }),
      });
      const data = await res.json();
      if (res.ok) {
        get().fetchOpenTasks();
        get().fetchMyTasks();
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  },

  markDone: async (taskId) => {
    try {
      const res = await fetch('/api/tasks/done', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId }),
      });
      if (res.ok) {
        get().fetchMyTasks();
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      return { success: false };
    }
  },

  createTask: async (title, description) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        get().fetchAdminTasks();
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      return { success: false };
    }
  },

  // Polling logic
  startPolling: (interval = 5000) => {
    const poll = async () => {
      await get().fetchOpenTasks();
      // If admin panel is open, we can poll that too
      // But typically, open tasks is what everyone needs real-time
    };
    poll();
    const intervalId = setInterval(poll, interval);
    return () => clearInterval(intervalId);
  }
}));

export default useTasks;
