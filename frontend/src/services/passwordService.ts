import api from "../interceptors/axiosInterceptor";
import { Password } from "../models/password";

const API_URL = import.meta.env.VITE_API_URL + "/passwords" || "";

export const getPasswords = async (): Promise<Password[]> => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo contraseñas:", error);
    return [];
  }
};

export const getPasswordById = async (id: number): Promise<Password | null> => {
  try {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo contraseña:", error);
    return null;
  }
};

export const createPassword = async (password: Omit<Password, "id">): Promise<Password | null> => {
  try {
    const response = await api.post(API_URL, password);
    return response.data;
  } catch (error) {
    console.error("Error creando contraseña:", error);
    return null;
  }
};

export const updatePassword = async (id: number, password: Partial<Password>): Promise<Password | null> => {
  try {
    const response = await api.put(`${API_URL}/${id}`, password);
    return response.data;
  } catch (error) {
    console.error("Error actualizando contraseña:", error);
    return null;
  }
};

export const deletePassword = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error eliminando contraseña:", error);
    return false;
  }
};
