import React from 'react';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { userService } from "../../services/userService";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";
import GenericTailwindForm from '../../components/common/TailWind/TailwindForm';
import { Field } from '../../components/common/TailWind/TailwindForm';

const CreateUser: React.FC = () => {
  const navigate = useNavigate();

    const fields: Field[] = [
    { name: "name", label: "Nombre", type: "text" },
    { name: "email", label: "Correo", type: "email" },
    { name: "password", label: "Contraseña", type: "password" },
    ];


  const handleSubmit = async (formData: any) => {
    try {
      const createdUser = await userService.createUser(formData as User);
      if (createdUser) {
        Swal.fire({
          title: "Completado",
          text: "Se ha creado correctamente el registro",
          icon: "success",
          timer: 3000
        });
        navigate("/users/list");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Existe un problema al momento de crear el registro",
        icon: "error",
        timer: 3000
      });
    }
  };

  return (
    <div className="p-4">
      <Breadcrumb pageName="" />
      <h2 className="text-2xl font-bold mb-4">Crear Usuario</h2>

      <GenericTailwindForm
        fields={fields}
        initialData={{}} // vacío porque es creación
        onSubmit={handleSubmit}
        onCancel={() => navigate("/users/list")} // cancelar vuelve a la lista
      />
    </div>
  );
};

export default CreateUser;
