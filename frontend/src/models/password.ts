export interface Password {
  id?: number;
  content: string;
  startAt?: string; // ISO datetime
  endAt?: string;
  userId?: number;
}
// Define una interfaz TypeScript llamada Password, que describe cómo debe lucir un objeto de tipo "contraseña".