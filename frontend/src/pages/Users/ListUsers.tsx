import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GenericTableMUI from "../../components/common/MaterialUI/GenericTableMUI";
import { getUsers, deleteUser } from "../../services/userService";
import { User } from "../../models/user";
import Swal from "sweetalert2";

const ListUsers = () => {
  const [data, setData] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const users = await getUsers();
    setData(users);
  };

  const handleAdd = () => {
    navigate("/users/create");
  };
  // Acción al hacer clic en Address
  const handleAction = async (name: string, item: Record<string, any>) => {
    if (name === "address") {
      navigate(`/users/address/${item.id}`);
    } else if (name === "edit") {
      navigate(`/users/update/${item.id}`);
    } else if (name === "delete") {
      await handleDelete(item);
      // Aquí puedes agregar la lógica para eliminar un usuario si es necesario
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
          await deleteUser(item.id); // función del service
          Swal.fire("Eliminado", "El usuario ha sido eliminado", "success");
          fetchData(); // refresca la lista
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire("Error", "No se pudo eliminar el usuario", "error");
        }
      }
    });
  };

  const columns = ["id", "name", "email"];
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
        columns={columns}
        actions={actions}
        onAction={handleAction}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default ListUsers;
