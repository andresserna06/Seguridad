// src/services/userService.ts
import { User } from "../models/user";
import api from "../interceptors/axiosInterceptor"; // tu instancia de Axios con interceptores

// Obtener todos los usuarios
export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await api.get("/users"); // baseURL ya incluido en api
        return response.data;
    } catch (error: any) {
        console.error("Error obteniendo usuarios:", error.response?.data || error.message);
        return [];
    }
};

// Obtener usuario por ID
export const getUserById = async (id: number): Promise<User | null> => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Usuario no encontrado:", error.response?.data || error.message);
        return null;
    }
};

// Crear usuario
export const createUser = async (user: Omit<User, "id">): Promise<User | null> => {
    try {
        const response = await api.post("/users", user);
        return response.data;
    } catch (error: any) {
        console.error("Error creando usuario:", error.response?.data || error.message);
        return null;
    }
};

// Actualizar usuario
export const updateUser = async (id: number, user: Partial<User>): Promise<User | null> => {
    try {
        const response = await api.put(`/users/${id}`, user);
        return response.data;
    } catch (error: any) {
        console.error("Error actualizando usuario:", error.response?.data || error.message);
        return null;
    }
};

// Eliminar usuario
export const deleteUser = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/users/${id}`);
        return true;
    } catch (error: any) {
        console.error("Error eliminando usuario:", error.response?.data || error.message);
        return false;
    }
};
