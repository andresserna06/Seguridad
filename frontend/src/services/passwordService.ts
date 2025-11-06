// src/services/passwordService.ts
import { Password } from "../models/password";
import api from "../interceptors/axiosInterceptor";

// Obtener todas las contraseñas
export const getPasswords = async (): Promise<Password[]> => {
  try {
    const response = await api.get("/passwords");
    return response.data;
  } catch (error: any) {
    console.error("Error obteniendo contraseñas:", error.response?.data || error.message);
    return [];
  }
};

// Obtener contraseñas de un usuario específico
export const getPasswordsByUser = async (user_id: number): Promise<Password[]> => {
  try {
    const response = await api.get(`/passwords/user/${user_id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error obteniendo contraseñas del usuario:", error.response?.data || error.message);
    return [];
  }
};

// Crear una nueva contraseña
export const createPassword = async (password: Omit<Password, "id">): Promise<Password | null> => {
  try {
    const payload = {
      ...password,
      startAt: password.startAt?.toISOString().slice(0, 19).replace("T", " "),
      endAt: password.endAt?.toISOString().slice(0, 19).replace("T", " "),
    };

    const response = await api.post(`/passwords/user/${password.user_id}`, payload);
    return response.data;
  } catch (error: any) {
    console.error("Error creando contraseña:", error.response?.data || error.message);
    return null;
  }
};

// Actualizar contraseña
export const updatePassword = async (id: number, password: Partial<Password>): Promise<Password | null> => {
  try {
    const payload = {
      ...password,
      startAt: password.startAt
        ? password.startAt.toISOString().slice(0, 19).replace("T", " ")
        : undefined,
      endAt: password.endAt
        ? password.endAt.toISOString().slice(0, 19).replace("T", " ")
        : undefined,
    };

    const response = await api.put(`/passwords/${id}`, payload);
    return response.data;
  } catch (error: any) {
    console.error("Error actualizando contraseña:", error.response?.data || error.message);
    return null;
  }
};

// Eliminar contraseña
export const deletePassword = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/passwords/${id}`);
    return true;
  } catch (error: any) {
    console.error("Error eliminando contraseña:", error.response?.data || error.message);
    return false;
  }
};
