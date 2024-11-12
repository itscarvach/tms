import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username: string, password: string) => {
  const { data } = await api.post('/auth/login', { username, password });
  return data;
};

export const getUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};

export const createUser = async (userData: any) => {
  const { data } = await api.post('/users', userData);
  return data;
};

export const uploadTransportData = async (transportData: any) => {
  const { data } = await api.post('/transport', transportData);
  return data;
};

export const getTransportData = async () => {
  const { data } = await api.get('/transport');
  return data;
};

export default api;