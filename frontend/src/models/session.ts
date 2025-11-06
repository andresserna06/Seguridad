import { User } from "./user";

export interface Session {
  id?: string;
  user_id?: number;
  token?: string;
  expiration?: string;
  FACode?: string;
  state?: string;
  created_at?: string;
  updated_at?: string;
  user?: User;
}
