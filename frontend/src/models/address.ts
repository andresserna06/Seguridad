export interface Address {
  id?: number;
  user_id?: number; // FK hacia User
  street: string;
  number: string;
  latitude?: number;
  longitude?: number;
  created_at?: Date;
  updated_at?: Date;
}
