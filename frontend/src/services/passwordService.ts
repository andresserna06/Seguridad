// src/services/passwordService.ts
import { Password } from "../models/password";

const API_URL = import.meta.env.VITE_API_URL + "/passwords" || "";

// Obtener todas las contraseñas
export const getPasswords = async (): Promise<Password[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error obteniendo contraseñas");
    return await response.json();
  } catch (error) {
    console.error("Error obteniendo contraseñas:", error);
    return [];
  }
};

// Obtener contraseñas de un usuario específico
export const getPasswordsByUser = async (user_id: number): Promise<Password[]> => {
  try {
    const response = await fetch(`${API_URL}/user/${user_id}`);
    if (!response.ok) throw new Error("Error obteniendo contraseñas del usuario");
    return await response.json();
  } catch (error) {
    console.error("Error obteniendo contraseñas del usuario:", error);
    return [];
  }
};

// Crear una nueva contraseña
// Crear una nueva contraseña
export const createPassword = async (
  password: Omit<Password, "id">
): Promise<Password | null> => {
  try {
    // Convertir fechas Date a string compatible con backend
    const payload = {
      ...password,
      startAt: password.startAt?.toISOString().slice(0, 19).replace("T", " "),
      endAt: password.endAt?.toISOString().slice(0, 19).replace("T", " "),
    };

    const response = await fetch(`${API_URL}/user/${password.user_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Error creando contraseña");
    return await response.json();
  } catch (error) {
    console.error("Error creando contraseña:", error);
    return null;
  }
};


// Actualizar contraseña
// Actualizar contraseña
export const updatePassword = async (
  id: number,
  password: Partial<Password>
): Promise<Password | null> => {
  try {
    // Convertir fechas Date a string compatible con backend si existen
    const payload = {
      ...password,
      startAt: password.startAt
        ? password.startAt.toISOString().slice(0, 19).replace("T", " ")
        : undefined,
      endAt: password.endAt
        ? password.endAt.toISOString().slice(0, 19).replace("T", " ")
        : undefined,
    };

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Error actualizando contraseña");
    return await response.json();
  } catch (error) {
    console.error("Error actualizando contraseña:", error);
    return null;
  }
};


// Eliminar contraseña
export const deletePassword = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error eliminando contraseña");
    return true;
  } catch (error) {
    console.error("Error eliminando contraseña:", error);
    return false;
  }
};
