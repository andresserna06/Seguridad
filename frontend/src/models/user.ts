import { Role } from "./role";
import { Address } from "./address";
import { Profile } from "./profile";
import { Session } from "./session";

export interface User {
  id?: number;
  name?: string;
  email?: string;
  password?: string; // Solo para crear/actualizar
  age?: number;
  city?: string;
  phone?: string;
  is_active?: boolean;

  roles?: Role[];        // Un usuario puede tener varios roles asignados
  address?: Address;     // Un usuario puede tener una dirección
  profile?: Profile;     // Relación 1:1
  sessions?: Session[];  // Relación 1:N - Un usuario puede tener múltiples sesiones

  created_at?: string;
  updated_at?: string;
}

