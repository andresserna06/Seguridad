import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import TailwindTable from "../../components/common/TailWind/TailwindTable";
import GenericTableMUI from "../../components/common/MaterialUI/GenericTableMUI";
import { getPermissions, deletePermission } from "../../services/permissionService";
import { useNavigate } from "react-router-dom";
import { useLibrary } from "../../context/LibraryContext";

const ListPermissions = () => {
  const [permissions, setPermissions] = useState<any[]>([]);
  const navigate = useNavigate();
  const { library } = useLibrary(); // 👈 Trae el valor del contexto

  const tailwindColumns = ["id", "url", "method", "created_at", "updated_at"];

  const muiColumns = [
    { key: "id", label: "ID" },
    { key: "url", label: "URL" },
    { key: "method", label: "Método" },
    { key: "created_at", label: "Creado" },
    { key: "updated_at", label: "Actualizado" },
  ];

  const actions = [
    { name: "edit", label: "Editar" },
    { name: "delete", label: "Eliminar" },
  ];

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const data = await getPermissions();
      setPermissions(
        data.map((p: { created_at: string | number | Date; updated_at: string | number | Date }) => ({
          ...p,
          created_at: p.created_at ? new Date(p.created_at).toLocaleString() : "",
          updated_at: p.updated_at ? new Date(p.updated_at).toLocaleString() : "",
        }))
      );
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  const handleAdd = () => navigate("/permissions/create");

  const handleAction = async (action: string, item: any) => {
    if (action === "edit") navigate(`/permissions/update/${item.id}`);
    else if (action === "delete") await handleDelete(item);
  };

  const handleDelete = async (item: any) => {
    const result = await Swal.fire({
      title: "Eliminar Permiso",
      text: "¿Está seguro de eliminar este permiso?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deletePermission(item.id);
        Swal.fire("Eliminado", "El permiso ha sido eliminado", "success");
        fetchPermissions();
      } catch (error) {
        console.error("Error deleting permission:", error);
        Swal.fire("Error", "No se pudo eliminar el permiso", "error");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Permisos</h2>

      {library === "material" ? (
        <GenericTableMUI
          data={permissions}
          columns={muiColumns}
          actions={actions}
          onAdd={handleAdd}
          onAction={handleAction}
        />
      ) : (
        <TailwindTable
          data={permissions}
          columns={tailwindColumns}
          actions={actions}
          onAdd={handleAdd}
          addButtonLabel="Nuevo Permiso"
          onAction={handleAction}
        />
      )}
    </div>
  );
};

export default ListPermissions;
