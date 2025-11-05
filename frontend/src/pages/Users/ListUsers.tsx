import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GenericTableMUI from "../../components/common/MaterialUI/GenericTableMUI";
import { getUsers, deleteUser, createUser } from "../../services/userService";
import { User } from "../../models/user";
import Swal from "sweetalert2";

const ListUsers = () => {
  const [data, setData] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const users = await getUsers();

      const storedUser = localStorage.getItem("user");
      let oauthUsers: User[] = [];

      if (storedUser) {
        try {
          const userObj: User = JSON.parse(storedUser);
          const existingUser = users.find(u => u.email === userObj.email);

          if (!existingUser) {
            const createdUser = await createUser({
              name: userObj.name,
              email: userObj.email,
              // agrega otros campos que tu API necesite
            });
            oauthUsers.push(createdUser!);
          } else {
            oauthUsers.push(existingUser);
          }
        } catch (error) {
          console.error("Error parsing or creating OAuth user:", error);
        }
      }

      const mergedUsers = [
        ...users,
        ...oauthUsers.filter(u => !users.some(apiUser => apiUser.email === u.email))
      ];

      setData(mergedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAdd = () => {
    navigate("/users/create");
  };

  const handleAction = async (name: string, item: Record<string, any>) => {
    if (name === "address") {
      navigate(`/users/address/${item.id}`);
    } else if (name === "edit") {
      navigate(`/users/update/${item.id}`);
    } else if (name === "delete") {
      await handleDelete(item);
    } else if (name === "contraseñas") {
      navigate(`/users/password/${item.id}`);
    }
  };

  const handleDelete = async (item: any) => {
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
          await deleteUser(item.id);
          Swal.fire("Eliminado", "El usuario ha sido eliminado", "success");
          fetchData();
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire("Error", "No se pudo eliminar el usuario", "error");
        }
      }
    });
  };

  // 🔹 Columnas con key y label amigable
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Nombre" },
    { key: "email", label: "Correo Electrónico" }
  ];

  const actions = [
    { name: "edit", label: "Editar" },
    { name: "delete", label: "Eliminar" },
    { name: "contraseñas", label: "Contraseñas" },
    { name: "address", label: "Dirección" }
  ];

  return (
    <div>
      <GenericTableMUI
        title="Usuarios"
        data={data}
        columns={columns} // ahora usa key/label
        actions={actions}
        onAction={handleAction}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default ListUsers;
