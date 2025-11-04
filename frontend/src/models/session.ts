import { User } from "./user";

export interface Session {
    id?: string;
    user_id?: number; // ⚠️ Cambié userId a user_id para coincidir con backend
    token?: string;
    expiration?: string; // ⚠️ Cambié Date a string (backend devuelve string ISO)
    FACode?: string;
    state?: string;
    created_at?: string;
    updated_at?: string;
    user?: User; // Relación N:1 con User
}