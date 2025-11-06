import api from "../interceptors/axiosInterceptor";
import { Session } from "../models/session";


const API_URL = import.meta.env.VITE_API_URL + "sessions" || "";

class SessionService {
  // Obtener todas las sesiones
  async getAll(): Promise<Session[]> {
    try {
      const response = await api.get<Session[]>(API_URL);
      return response.data;
    } catch (error: any) {
      console.error("Error al obtener sesiones:", error.response?.data || error.message);
      return [];
    }
  }

  // Obtener sesión por ID
  async getById(id: string): Promise<Session | null> {
    try {
      const response = await api.get<Session>(`${API_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Sesión no encontrada:", error.response?.data || error.message);
      return null;
    }
  }

  // Obtener sesiones de un usuario
  async getByUserId(userId: number): Promise<Session[]> {
    try {
      const response = await api.get<Session[]>(`${API_URL}/user/${userId}`);
      return response.data;
    } catch (error: any) {
      console.error("Error al obtener sesiones del usuario:", error.response?.data || error.message);
      return [];
    }
  }

  // Crear sesión (user_id va en la URL)
async createSession(
  userId: number, 
  data: {
    token: string;
    expiration: string;
    FACode?: string;
    state: string;
  }
): Promise<Session | null> {
  try {
    const response = await api.post<Session>(`${API_URL}/user/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al crear sesión:", error);
    return null;
  }
}

  // Actualizar sesión
  async updateSession(id: string, data: Partial<Session>): Promise<Session | null> {
    try {
      const response = await api.put<Session>(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error: any) {
      console.error("Error al actualizar sesión:", error.response?.data || error.message);
      return null;
    }
  }

  // Eliminar sesión
  async deleteSession(id: string): Promise<boolean> {
    try {
      await api.delete(`${API_URL}/${id}`);
      return true;
    } catch (error: any) {
      console.error("Error al eliminar sesión:", error.response?.data || error.message);
      return false;
    }
  }
}

export const sessionService = new SessionService();