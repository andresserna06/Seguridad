import { UserRole } from "../models/userRole";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/user-roles" || "";

// Obtener todos los UserRoles
export const getUserRoles = async (): Promise<UserRole[]> => {
  try {
    const response = await api.get("/user-roles");
    return await response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Obtener UserRole por ID
export const getUserRoleById = async (id: number): Promise<UserRole | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("UserRole no encontrado");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Obtener usuarios por rol
export const getUsersByRole = async (roleId: number): Promise<UserRole[]> => {
  try {
    const response = await fetch(`${API_URL}/role/${roleId}`);
    if (!response.ok) throw new Error("Error al obtener usuarios por rol");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};


// Crear nuevo UserRole
export const createUserRole = async (
  userRole: Omit<UserRole, "id">
): Promise<UserRole | null> => {
  try {
    // Convertir fechas Date a ISO string antes de enviar
    const payload = {
      ...userRole,
      startAt: userRole.start_At?.toISOString().slice(0, 19).replace("T", " "),
      endAt: userRole.end_At?.toISOString().slice(0, 19).replace("T", " "),
    };

    const response = await fetch(
      `${API_URL}/user/${userRole.user_id}/role/${userRole.role_id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) throw new Error("Error al crear UserRole");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Actualizar UserRole
export const updateUserRole = async (id: number, userRole: Partial<UserRole>): Promise<UserRole | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userRole),
    });
    if (!response.ok) throw new Error("Error al actualizar UserRole");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Eliminar UserRole
export const deleteUserRole = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error al eliminar UserRole");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
