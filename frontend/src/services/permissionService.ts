import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL;

export const getPermissions = async () => {
  const res = await api.get(`${API_URL}/permissions`);
  return res.data;
};

export const getPermissionById = async (id: number) => {
  const res = await api.get(`${API_URL}/permissions/${id}`);
  return res.data;
};

export const createPermission = async (data: any) => {
  const res = await api.post(`${API_URL}/permissions`, data);
  return res.data;
};

export const updatePermission = async (id: number, data: any) => {
  const res = await api.put(`${API_URL}/permissions/${id}`, data);
  return res.data;
};

export const deletePermission = async (id: number) => {
  const res = await api.delete(`${API_URL}/permissions/${id}`);
  return res.data;
};
