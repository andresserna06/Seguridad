import { Role } from "./role";
import { Address } from "./address";

export interface User {
    id?: number;
    name?: string;
    email?: string;
    password?:string;
    age?: number;
    city?: string;
    phone?: string;
    is_active?: boolean;
    roles?: Role[]; // Un usuario puede tener varios roles asignados
    address?: Address; // Un usuario puede tener una dirección
    
}