import api from "../interceptors/axiosInterceptor";
import { Address } from "../models/address";

const API_URL = import.meta.env.VITE_API_URL + "/addresses" || "";

// Obtener todos los registros
export const getAddresses = async (): Promise<Address[]> => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo direcciones:", error);
    return [];
  }
};

// Obtener una dirección por ID
export const getAddressById = async (id: number): Promise<Address | null> => {
  try {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo dirección:", error);
    return null;
  }
};

// Crear una nueva dirección
export const createAddress = async (address: Omit<Address, "id">): Promise<Address | null> => {
  try {
    const response = await api.post(API_URL, address);
    return response.data;
  } catch (error) {
    console.error("Error creando dirección:", error);
    return null;
  }
};

// Actualizar dirección
export const updateAddress = async (id: number, address: Partial<Address>): Promise<Address | null> => {
  try {
    const response = await api.put(`${API_URL}/${id}`, address);
    return response.data;
  } catch (error) {
    console.error("Error actualizando dirección:", error);
    return null;
  }
};

// Eliminar dirección
export const deleteAddress = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error eliminando dirección:", error);
    return false;
  }
};
