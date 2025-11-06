// src/services/userRoleService.ts
import { UserRole } from "../models/userRole";
import api from "../interceptors/axiosInterceptor";

// Obtener todos los UserRoles
export const getUserRoles = async (): Promise<UserRole[]> => {
  try {
    const response = await api.get("/user-roles");
    return response.data;
  } catch (error: any) {
    console.error("Error obteniendo UserRoles:", error.response?.data || error.message);
    return [];
  }
};

// Obtener UserRole por ID
export const getUserRoleById = async (id: number): Promise<UserRole | null> => {
  try {
    const response = await api.get(`/user-roles/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("UserRole no encontrado:", error.response?.data || error.message);
    return null;
  }
};

// Obtener usuarios por rol
export const getUsersByRole = async (roleId: number): Promise<UserRole[]> => {
  try {
    const response = await api.get(`/user-roles/role/${roleId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener usuarios por rol:", error.response?.data || error.message);
    return [];
  }
};

// Crear nuevo UserRole
export const createUserRole = async (userRole: Omit<UserRole, "id">): Promise<UserRole | null> => {
  try {
    const payload = {
      ...userRole,
      startAt: userRole.start_At?.toISOString().slice(0, 19).replace("T", " "),
      endAt: userRole.end_At?.toISOString().slice(0, 19).replace("T", " "),
    };

    const response = await api.post(
      `/user-roles/user/${userRole.user_id}/role/${userRole.role_id}`,
      payload
    );

    return response.data;
  } catch (error: any) {
    console.error("Error al crear UserRole:", error.response?.data || error.message);
    return null;
  }
};

// Actualizar UserRole
export const updateUserRole = async (
  id: number,
  userRole: Partial<UserRole>
): Promise<UserRole | null> => {
  try {
    const response = await api.put(`/user-roles/${id}`, userRole);
    return response.data;
  } catch (error: any) {
    console.error("Error al actualizar UserRole:", error.response?.data || error.message);
    return null;
  }
};

// Eliminar UserRole
export const deleteUserRole = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`/user-roles/${id}`);
    return true;
  } catch (error: any) {
    console.error("Error al eliminar UserRole:", error.response?.data || error.message);
    return false;
  }
};
