// src/services/addressService.ts
import { Address } from "../models/address";
import api from "../interceptors/axiosInterceptor";

// Obtener todas las direcciones
export const getAddresses = async (): Promise<Address[]> => {
  try {
    const response = await api.get("/addresses");
    return response.data;
  } catch (error: any) {
    console.error("Error obteniendo direcciones:", error.response?.data || error.message);
    return [];
  }
};

// Obtener una dirección por ID
export const getAddressById = async (id: number): Promise<Address | null> => {
  try {
    const response = await api.get(`/addresses/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error obteniendo dirección:", error.response?.data || error.message);
    return null;
  }
};

// Crear una nueva dirección
export const createAddress = async (address: Omit<Address, "id">): Promise<Address | null> => {
  try {
    const response = await api.post(`/addresses/user/${address.user_id}`, address);
    return response.data;
  } catch (error: any) {
    console.error("Error creando dirección:", error.response?.data || error.message);
    return null;
  }
};

// Actualizar dirección
export const updateAddress = async (id: number, address: Partial<Address>): Promise<Address | null> => {
  try {
    const response = await api.put(`/addresses/${id}`, address);
    return response.data;
  } catch (error: any) {
    console.error("Error actualizando dirección:", error.response?.data || error.message);
    return null;
  }
};

// Eliminar dirección
export const deleteAddress = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/addresses/${id}`);
    return true;
  } catch (error: any) {
    console.error("Error eliminando dirección:", error.response?.data || error.message);
    return false;
  }
};
