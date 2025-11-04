import { Address } from "../models/address";

const API_URL = import.meta.env.VITE_API_URL + "/addresses" || "";

// Obtener todos los registros
export const getAddresses = async (): Promise<Address[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error obteniendo direcciones");
    return await response.json();
  } catch (error) {
    console.error("Error obteniendo direcciones:", error);
    return [];
  }
};

// Obtener una dirección por ID
export const getAddressById = async (id: number): Promise<Address | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Error obteniendo dirección");
    return await response.json();
  } catch (error) {
    console.error("Error obteniendo dirección:", error);
    return null;
  }
};

// Crear una nueva dirección
export const createAddress = async (address: Omit<Address, "id">): Promise<Address | null> => {
  try {
    const response = await fetch(`${API_URL}/user/${address.user_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(address),
    });
    if (!response.ok) throw new Error("Error creando dirección");
    return await response.json();
  } catch (error) {
    console.error("Error creando dirección:", error);
    return null;
  }
};

// Actualizar dirección
export const updateAddress = async (id: number, address: Partial<Address>): Promise<Address | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(address),
    });
    if (!response.ok) throw new Error("Error actualizando dirección");
    return await response.json();
  } catch (error) {
    console.error("Error actualizando dirección:", error);
    return null;
  }
};

// Eliminar dirección
export const deleteAddress = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error eliminando dirección");
    return true;
  } catch (error) {
    console.error("Error eliminando dirección:", error);
    return false;
  }
};
