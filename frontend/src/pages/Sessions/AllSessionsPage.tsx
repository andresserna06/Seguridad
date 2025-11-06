import React, { useEffect, useState } from "react";
import TailwindTable from "../../components/common/TailWind/TailwindTable";
import { sessionService } from "../../services/sessionService";
import { Session } from "../../models/session";
import Swal from "sweetalert2";

const AllSessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    user_id: "",
    token: "",
    expiration: "",
    FACode: "",
    state: "",
  });

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

  const columns: (keyof Session)[] = [
    "id",
    "user_id",
    "token",
    "state",
    "expiration",
    "FACode",
    "created_at",
    "updated_at",
  ];

  const actions = [
    { name: "edit", label: "Editar" },
    { name: "delete", label: "Eliminar" },
  ];

  // 🔹 Manejo de acciones
  const handleAction = async (action: string, item: Session) => {
    if (action === "delete") {
      handleDelete(item);
    } else if (action === "edit") {
      handleEdit(item);
    }
  };

  // 🔹 Función para abrir el modal de edición
  const handleEdit = (item: Session) => {
    setIsEditing(true);
    setEditingId(item.id || null);

    // Convertir la fecha a datetime-local
    let expirationLocal = "";
    if (item.expiration) {
      const date = new Date(item.expiration);
      expirationLocal = date.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
    }

    setFormData({
      user_id: item.user_id?.toString() || "",
      token: item.token || "",
      expiration: expirationLocal,
      FACode: item.FACode || "",
      state: item.state || "",
    });

    setShowModal(true);
  };

  // 🔹 Función para eliminar
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

  // 🔹 Convertir fecha a formato YYYY-MM-DD HH:MM:SS
  const formatDateForBackend = (dateString: string) => {
    const date = new Date(dateString);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      " " +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds())
    );
  };

  // 🔹 Crear o actualizar sesión
  const handleSubmit = async () => {
    if (!formData.token || !formData.expiration || !formData.state) {
      Swal.fire("Error", "Por favor, completa todos los campos obligatorios", "error");
      return;
    }

    const expirationFormatted = formatDateForBackend(formData.expiration);

    try {
      if (isEditing && editingId) {
        // 🔹 ACTUALIZAR
        const updatedSession = await sessionService.updateSession(editingId, {
          token: formData.token,
          expiration: expirationFormatted,
          FACode: formData.FACode || "",
          state: formData.state,
        });

        if (updatedSession) {
          Swal.fire("Actualizada", "La sesión ha sido actualizada", "success");
          closeModal();
          fetchSessions();
        } else {
          Swal.fire("Error", "No se pudo actualizar la sesión", "error");
        }
      } else {
        // 🔹 CREAR
        if (!formData.user_id) {
          Swal.fire("Error", "El User ID es obligatorio para crear", "error");
          return;
        }

        const newSession = await sessionService.createSession(Number(formData.user_id), {
          token: formData.token,
          expiration: expirationFormatted,
          FACode: formData.FACode || "",
          state: formData.state,
        });

        if (newSession) {
          Swal.fire("Creada", "La sesión ha sido creada", "success");
          closeModal();
          fetchSessions();
        } else {
          Swal.fire("Error", "No se pudo crear la sesión", "error");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "Ocurrió un error inesperado", "error");
    }
  };

  // 🔹 Cerrar modal y limpiar formulario
  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditingId(null);
    setFormData({ user_id: "", token: "", expiration: "", FACode: "", state: "" });
  };

  // 🔹 Abrir modal para crear
  const handleOpenCreate = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({ user_id: "", token: "", expiration: "", FACode: "", state: "" });
    setShowModal(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Todas las sesiones</h2>

      <TailwindTable
        data={sessions}
        columns={columns}
        actions={actions}
        title="Sesiones"
        onAdd={handleOpenCreate}
        addButtonLabel="Nueva sesión"
        onAction={handleAction}
      />

      {/* Modal de creación/edición */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">
              {isEditing ? "Editar sesión" : "Crear nueva sesión"}
            </h3>
            <div className="flex flex-col gap-3">
              {/* User ID - solo para crear */}
              {!isEditing && (
                <div>
                  <label className="block text-sm font-medium mb-1">User ID *</label>
                  <input
                    type="number"
                    placeholder="User ID"
                    value={formData.user_id}
                    onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                    className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              )}

              {/* Token */}
              <div>
                <label className="block text-sm font-medium mb-1">Token *</label>
                <input
                  type="text"
                  placeholder="Token"
                  value={formData.token}
                  onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Expiration */}
              <div>
                <label className="block text-sm font-medium mb-1">Expiración *</label>
                <input
                  type="datetime-local"
                  value={formData.expiration}
                  onChange={(e) => setFormData({ ...formData, expiration: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* FACode */}
              <div>
                <label className="block text-sm font-medium mb-1">FACode (opcional)</label>
                <input
                  type="text"
                  placeholder="FACode"
                  value={formData.FACode}
                  onChange={(e) => setFormData({ ...formData, FACode: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium mb-1">Estado *</label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Selecciona estado</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={closeModal}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
              >
                {isEditing ? "Actualizar" : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllSessionsPage;
