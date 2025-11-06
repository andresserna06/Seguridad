import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { userService } from "../../services/userService";
import { User } from '../../models/user';
import Breadcrumb from "../../components/Breadcrumb";
import GenericTailwindForm, { Field } from "../../components/common/TailWind/TailwindForm";

const UpdateUser: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  // Definir los campos tipados
  const fields: Field[] = [
    { name: "name", label: "Nombre", type: "text" },
    { name: "email", label: "Correo", type: "email" },
  ];

  // Cargar datos del usuario
  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      const userData = await userService.getUserById(parseInt(id));
      setUser(userData);
    };
    fetchUser();
  }, [id]);

  if (!user) return <div>Cargando...</div>;

  // Actualización del usuario
  const handleUpdateUser = async (updatedData: any) => {
    try {
      const updatedUser = await userService.updateUser(user.id!, updatedData);
      if (updatedUser) {
        Swal.fire({
          title: "Completado",
          text: "Usuario actualizado correctamente",
          icon: "success",
          timer: 3000,
        });
        navigate("/users/list");
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo actualizar el usuario",
          icon: "error",
          timer: 3000,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ocurrió un problema al actualizar",
        icon: "error",
        timer: 3000,
      });
    }
  };

  return (
    <div>
      <Breadcrumb pageName="Actualizar Usuario" />

      <GenericTailwindForm
        fields={fields}
        initialData={user}
        onSubmit={handleUpdateUser}
        onCancel={() => navigate("/users/list")}
      />
    </div>
  );
};

export default UpdateUser;
