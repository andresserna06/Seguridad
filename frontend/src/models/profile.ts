import { User } from "./user";
export interface Profile {
    id?: number;
    user_id: number;  // obligatorio, vincula perfil con usuario
    phone?: string;    // obligatorio para evitar repetición
    photo?: string;    // obligatorio, o poner valor por defecto
    created_at?: string;
    updated_at?: string;
    user?: User;
}


