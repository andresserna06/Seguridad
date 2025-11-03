import axios from "axios"; // Libreria para hacer llamados desde la API
import { User } from "../models/user";

const API_URL = import.meta.env.VITE_API_URL + "/users" || ""; // Aqui me traigo la variable de entorno de donde viene el Backend, link del servidor donde se encuentran los usuarios

class UserService {
    async getUsers(): Promise<User[]> { // asyc para que la aplicacion no se congele mientras espera la respuesta del backend
        try {
            const response = await axios.get<User[]>(API_URL);
            return response.data;
        } catch (error) { //Si hay error mostrarlo y enviar una lista vacia 
            console.error("Error al obtener usuarios:", error);
            return [];
        }
    }

    async getUserById(id: number): Promise<User | null> {
        try {
            const response = await axios.get<User>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Usuario no encontrado:", error);
            return null;
        }
    }

    async createUser(user: Omit<User, "id">): Promise<User | null> {
        try {
            const response = await axios.post<User>(API_URL, user);
            return response.data;
        } catch (error) {
            console.error("Error al crear usuario:", error);
            return null;
        }
    }

    async updateUser(id: number, user: Partial<User>): Promise<User | null> {
        try {
            const response = await axios.put<User>(`${API_URL}/${id}`, user);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            return null;
        }
    }

    async deleteUser(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            return false;
        }
    }
}

// Exportamos una instancia de la clase para reutilizarla
export const userService = new UserService();
