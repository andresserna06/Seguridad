import { Role } from "../models/role";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/roles" || "";

// Obtener todos los roles
export const getRoles = async (): Promise<Role[]> => {
  try {
    const response = await api.get("/roles");
    return await response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Obtener un rol por ID
export const getRoleById = async (id: number): Promise<Role | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Rol no encontrado");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Crear nuevo rol
export const createRole = async (role: Omit<Role, "id">): Promise<Role | null> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(role),
    });
    console.log(response);
    if (!response.ok) throw new Error("Error al crear rol");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Actualizar rol
export const updateRole = async (id: number, role: Partial<Role>): Promise<Role | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(role),
    });
    if (!response.ok) throw new Error("Error al actualizar rol");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Eliminar rol
export const deleteRole = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error al eliminar rol");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
