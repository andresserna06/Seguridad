import { User } from "./user";

export interface Profile {
  id?: number;
  phone?: string;
  photo?: string;
  userId?: number; // Relación 1:1 con User
  user?: User;     // Objeto User opcional
}
