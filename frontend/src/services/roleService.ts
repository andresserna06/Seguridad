// src/services/roleService.ts
import { Role } from "../models/role";
import api from "../interceptors/axiosInterceptor";

// Obtener todos los roles
export const getRoles = async (): Promise<Role[]> => {
  try {
    const response = await api.get("/roles");
    return response.data;
  } catch (error: any) {
    console.error("Error obteniendo roles:", error.response?.data || error.message);
    return [];
  }
};

// Obtener un rol por ID
export const getRoleById = async (id: number): Promise<Role | null> => {
  try {
    const response = await api.get(`/roles/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Rol no encontrado:", error.response?.data || error.message);
    return null;
  }
};

// Crear nuevo rol
export const createRole = async (role: Omit<Role, "id">): Promise<Role | null> => {
  try {
    const response = await api.post("/roles", role);
    return response.data;
  } catch (error: any) {
    console.error("Error al crear rol:", error.response?.data || error.message);
    return null;
  }
};

// Actualizar rol
export const updateRole = async (id: number, role: Partial<Role>): Promise<Role | null> => {
  try {
    const response = await api.put(`/roles/${id}`, role);
    return response.data;
  } catch (error: any) {
    console.error("Error al actualizar rol:", error.response?.data || error.message);
    return null;
  }
};

// Eliminar rol
export const deleteRole = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/roles/${id}`);
    return true;
  } catch (error: any) {
    console.error("Error al eliminar rol:", error.response?.data || error.message);
    return false;
  }
};
