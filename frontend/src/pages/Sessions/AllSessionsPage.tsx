import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { sessionService } from "../../services/sessionService";
import { Session } from "../../models/session";
import { useLibrary } from "../../context/LibraryContext";
import TailwindTable from "../../components/common/TailWind/TailwindTable";
import GenericTableMUI from "../../components/common/MaterialUI/GenericTableMUI";

const AllSessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const { library } = useLibrary();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    const data = await sessionService.getAll();

    const formattedData = data.map((s) => ({
      ...s,
      created_at: s.created_at ? new Date(s.created_at).toLocaleString() : "",
      updated_at: s.updated_at ? new Date(s.updated_at).toLocaleString() : "",
      expiration: s.expiration ? new Date(s.expiration).toLocaleString() : "",
    }));

    setSessions(formattedData);
  };

  const handleDelete = async (item: Session) => {
    const result = await Swal.fire({
      title: "¿Eliminar sesión?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      if (!item.id) return;
      const success = await sessionService.deleteSession(item.id);
      if (success) {
        Swal.fire("Eliminada", "La sesión ha sido eliminada", "success");
        fetchSessions();
      } else {
        Swal.fire("Error", "No se pudo eliminar la sesión", "error");
      }
    }
  };

  const handleAction = (action: string, item: Session) => {
    if (action === "edit" && item.id) {
      navigate(`/sessions/update/${item.id}`);
    } else if (action === "delete") {
      handleDelete(item);
    }
  };

  const handleCreate = () => {
    navigate("/sessions/create");
  };

  const tailwindColumns: (keyof Session)[] = [
    "id",
    "user_id",
    "token",
    "state",
    "expiration",
    "FACode",
    "created_at",
    "updated_at",
  ];

  const muiColumns = [
    { key: "id", label: "ID" },
    { key: "user_id", label: "Usuario ID" },
    { key: "token", label: "Token" },
    { key: "state", label: "Estado" },
    { key: "expiration", label: "Expiración" },
    { key: "FACode", label: "FACode" },
    { key: "created_at", label: "Creado" },
    { key: "updated_at", label: "Actualizado" },
  ];

  const actions = [
    { name: "edit", label: "Editar" },
    { name: "delete", label: "Eliminar" },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Todas las sesiones</h2>

      {library === "material" ? (
        <GenericTableMUI
          data={sessions}
          columns={muiColumns}
          actions={actions}
          onAdd={handleCreate}
          onAction={handleAction}
        />
      ) : (
        <TailwindTable
          data={sessions}
          columns={tailwindColumns}
          actions={actions}
          addButtonLabel="Nueva sesión"
          onAdd={handleCreate}
          onAction={handleAction}
        />
      )}
    </div>
  );
};

export default AllSessionsPage;
