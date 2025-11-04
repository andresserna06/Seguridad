export interface UserRole {
  id?: string;        // Opcional, si la DB genera un UUID automáticamente
  user_id: number;     // FK hacia User
  role_id: number;     // FK hacia Role
  start_At?: Date;   // Fecha opcional de inicio
  end_At?: Date;     // Fecha opcional de fin
}
