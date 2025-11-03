import { User } from "./user";

export interface Session {
  id?: string;
  token?: string;
  expiration?: Date;  //  tipo Date en TypeScript
  FACode?: string;
  state?: string;
  userId?: number; // clave foránea hacia User
  user?: User;     // relación directa 
}
