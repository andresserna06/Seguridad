import { Profile } from "./profile";
import { Session } from "./session";

export interface User {
    phone?: string | undefined;
    id?: number;
    name?: string;
    email?: string;
    password?: string; // Solo para crear/actualizar
    created_at?: string;
    updated_at?: string;
    profile?: Profile; // Relación 1:1
    sessions?: Session[]; // Relación 1:N - Un usuario puede tener múltiples sesiones
}