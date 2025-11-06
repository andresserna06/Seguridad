import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GenericTableMUI from "../../components/common/MaterialUI/GenericTableMUI";
import TailwindTable from "../../components/common/TailWind/TailwindTable";
import { userService } from "../../services/userService";
import { User } from "../../models/user";

const ListUsers: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddUser = () => {
    // Navega a la ruta de creación
    navigate("/users/create");
  };

  const handleAction = async (action: string, item: User) => {
    if (action === "edit") navigate(`/users/update/${item.id}`);
    else if (action === "delete") await handleDelete(item);
    else if (action === "address") navigate(`/users/address/${item.id}`);
    else if (action === "profile") navigate(`/profile/${item.id}`);
  };

  const handleDelete = async (item: User) => {
    Swal.fire({
      title: "Eliminar Usuario",
      text: "¿Está seguro de eliminar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const success = await userService.deleteUser(item.id!);
          if (success) {
            Swal.fire("Eliminado", "El usuario ha sido eliminado", "success");
            fetchData();
          } else {
            Swal.fire("Error", "No se pudo eliminar el usuario", "error");
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire("Error", "No se pudo eliminar el usuario", "error");
        }
      }
    });
  };

  const columns: (keyof User)[] = ["id", "name", "email"];
  const actions = [
    { name: "profile", label: "Perfil" },
    { name: "edit", label: "Editar" },
    { name: "delete", label: "Eliminar" },
    { name: "address", label: "Dirección" },
  ];

  return (
    <div className="p-4">
      {/* Tabla Material UI */}
      <GenericTableMUI
        title="Usuarios"
        data={users}
        columns={columns}
        actions={actions}
        onAction={handleAction}
        onAdd={handleAddUser} // Navega a /users/create
      />

      {/* Tabla Tailwind */}
      <TailwindTable
        data={users}
        columns={columns}
        actions={actions}
        onAction={handleAction}
        onAdd={handleAddUser} // También navega a /users/create
      />
    </div>
  );
};

export default ListUsers;
