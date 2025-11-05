// src/services/userService.ts
import { User } from "../models/user";

const API_URL = import.meta.env.VITE_API_URL + "/users" || "";

// Obtener todos los usuarios
export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error obteniendo usuarios");
        return await response.json();
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        return [];
    }
};

// Obtener usuario por ID
export const getUserById = async (id: number): Promise<User | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Usuario no encontrado");
        return await response.json();
    } catch (error) {
        console.error("Usuario no encontrado:", error);
        return null;
    }
};

// Crear usuario
export const createUser = async (
    user: Omit<User, "id">
): Promise<User | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        if (!response.ok) throw new Error("Error creando usuario");
        return await response.json();
    } catch (error) {
        console.error("Error creando usuario:", error);
        return null;
    }
};

// Actualizar usuario
export const updateUser = async (
    id: number,
    user: Partial<User>
): Promise<User | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        if (!response.ok) throw new Error("Error actualizando usuario");
        return await response.json();
    } catch (error) {
        console.error("Error actualizando usuario:", error);
        return null;
    }
};

// Eliminar usuario
export const deleteUser = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error eliminando usuario");
        return true;
    } catch (error) {
        console.error("Error eliminando usuario:", error);
        return false;
    }
};
