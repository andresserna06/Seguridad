import { User } from "./user";
//import { Permission } from "./permission";

export interface Role {
  id: number;
  name: string;
  description: string;
  user?: User[]; // Un rol puede tener varios usuarios asignados
  //permissions?: Permission[];
}

// Define una interfaz TypeScript llamada Role,que describe cómo debe lucir un objeto de tipo “rol”.
// Los tres campos (id, name, description) vienen del diagrama de clases.
// Servirá como tipo de dato para:
// el servicio (roleService.ts)
// los componentes (ListRole.tsx, CreateRole.tsx, etc.)