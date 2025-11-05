export interface Password {
  id?: number;
  content: string;
  startAt?: Date;
  endAt?: Date;
  user_id?: number;
}
// Define una interfaz TypeScript llamada Password, que describe cómo debe lucir un objeto de tipo "contraseña".