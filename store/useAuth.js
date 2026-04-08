import { create } from 'zustand';

const useAuth = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  
  logout: async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      set({ user: null, isAuthenticated: false });
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      // We'll trust the middleware/initial page load for simplicity, 
      // but this could be a /api/auth/me call
      const res = await fetch('/api/auth/me'); // Optional: check status
      if (res.ok) {
        const data = await res.json();
        set({ user: data.user, isAuthenticated: true, isLoading: false });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  }
}));

export default useAuth;
