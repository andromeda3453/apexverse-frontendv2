
import { create } from 'zustand';
import api from '../services/api';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,

  login: async (email, password) => {
    set({ loading: true });
    try {
      // Backend expects OAuth2PasswordRequestForm (form data)
      const params = new URLSearchParams();
      params.append('username', email);
      params.append('password', password);

      const response = await api.post('/auth/login', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      set({ token: access_token, isAuthenticated: true, loading: false });
      
      // Fetch user profile after login
      await useAuthStore.getState().fetchUser();
      return { success: true };
    } catch (error) {
      set({ loading: false });
      return { success: false, error: error.response?.data?.detail || 'Login failed' };
    }
  },

  register: async (email, password) => {
    set({ loading: true });
    try {
      await api.post('/auth/register', { email, password });
      set({ loading: false });
      return { success: true };
    } catch (error) {
      set({ loading: false });
      return { success: false, error: error.response?.data?.detail || 'Registration failed' };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  fetchUser: async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const response = await api.get('/auth/me');
      set({ user: response.data, isAuthenticated: true });
    } catch (error) {
      console.error('Failed to fetch user', error);
      if (error.response?.status === 401) {
        useAuthStore.getState().logout();
      }
    }
  },
}));

export default useAuthStore;
