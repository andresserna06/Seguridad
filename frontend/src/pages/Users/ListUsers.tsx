import React, { useEffect, useState } from "react";
import TailwindTable from "../../components/TailWind/TailwindTable";
import { User } from "../../models/user";
import { userService } from "../../services/userService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ListUsers: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const users = await userService.getUsers();
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAction = async (action: string, item: User) => {
    if (action === "edit") {
      navigate(`/users/update/${item.id}`);
    } else if (action === "delete") {
      await deleteUser(item);
    } else if (action === "profile") {
      navigate(`/users/profile/${item.id}`);
    }
  };

  const deleteUser = async (item: User) => {
    Swal.fire({
      title: "Eliminación",
      text: "Está seguro de querer eliminar el registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await userService.deleteUser(item.id!);
        if (success) {
          Swal.fire({
            title: "Eliminado",
            text: "El registro se ha eliminado",
            icon: "success",
          });
        }
        fetchData();
      }
    });
  };

  const handleAddUser = () => {
    navigate("/users/create"); // Redirige al CreateUser
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Usuarios</h2>
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Nuevo Usuario
        </button>
      </div>

      <TailwindTable
        data={users}
        columns={["id", "name", "email"]}
        actions={[
          { name: "profile", label: "Perfil" },
          { name: "edit", label: "Edit" },
          { name: "delete", label: "Delete" },
        ]}
        onAction={handleAction}
      />
    </div>
  );
};

export default ListUsers;
