import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { sessionService } from "../../services/sessionService";
import GenericFormMUI from "../../components/common/MaterialUI/GenericFormMUI";
import GenericTailwindForm from "../../components/common/TailWind/TailwindForm";
import { useLibrary } from "../../context/LibraryContext";
import Swal from "sweetalert2";

/**
 * Debo de ormaliza cualquier fecha que venga del backend a un valor compatible con
 * <input type="datetime-local"> en hora local: "YYYY-MM-DDTHH:MM:SS"
 *
 * Acepta:
 * - "2025-11-06 21:45:30"
 * - "2025-11-06T21:45:30Z"
 * - "2025-11-06 21:45:30.000"
 * - etc.
 */
function normalizeForDatetimeLocal(value: any): string {
  if (!value) return "";

  // Si ya es un Date
  if (value instanceof Date && !isNaN(value.valueOf())) {
    const d = value;
    return toLocalDatetimeLocalString(d);
  }

  // Intenta usar Date para parsear múltiples formatos
  const parsed = new Date(String(value));
  if (isNaN(parsed.valueOf())) {
    // fallback: si no se puede parsear, intenta reemplazar espacio por T y quitar Z/offsets/milisegundos
    let s = String(value).trim();
    s = s.replace(" ", "T").replace(/\.\d+/, "").replace(/Z|([+-]\d{2}:\d{2})$/, "");
    const p = new Date(s);
    if (!isNaN(p.valueOf())) return toLocalDatetimeLocalString(p);
    return ""; // si todo falla, devolver vacío
  }

  return toLocalDatetimeLocalString(parsed);
}

/** Construye el string "YYYY-MM-DDTHH:MM:SS" usando la hora local */
function toLocalDatetimeLocalString(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

/** Convierte "YYYY-MM-DDTHH:MM:SS" -> "YYYY-MM-DD HH:MM:SS" para backend */
function datetimeLocalToBackend(value: any): string | null {
  if (!value) return null;
  // si viene con T, reemplazar por espacio y quitar milisegundos/zonas
  return String(value).replace("T", " ").replace(/\.\d+/, "").replace(/Z|([+-]\d{2}:\d{2})$/, "");
}

const UpdateSession: React.FC = () => {
  const { library } = useLibrary();
  const [sessionData, setSessionData] = useState<any>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const sessionFields = [
    { name: "token", label: "Token", type: "text" as const, required: true },
    { name: "expiration", label: "Expiración", type: "datetime-local" as const, required: true },
    { name: "FACode", label: "Código 2FA (opcional)", type: "text" as const },
    {
      name: "state",
      label: "Estado",
      type: "select" as const,
      required: true,
      options: [
        { value: "active", label: "Activo" },
        { value: "inactive", label: "Inactivo" },
      ],
    },
  ];

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await sessionService.getById(String(id));
        if (!data) {
          Swal.fire("❌ Sesión no encontrada");
          navigate("/sessions");
          return;
        }

        // Normaliza expiration para que funcione con datetime-local
        const formattedData = {
          ...data,
          expiration: normalizeForDatetimeLocal(data.expiration),
        };

        setSessionData(formattedData);
      } catch (error) {
        console.error(error);
        Swal.fire("Error al cargar la sesión");
      }
    };
    fetchSession();
  }, [id, navigate]);

  const handleUpdateSession = async (data: any) => {
    try {
      const formattedData = {
        ...data,
        expiration: datetimeLocalToBackend(data.expiration),
      };

      const response = await sessionService.updateSession(String(id), formattedData);
      if (response) {
        Swal.fire("✅ Sesión actualizada correctamente");
        navigate("/sessions");
      } else {
        Swal.fire("❌ Error al actualizar la sesión");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error inesperado al actualizar la sesión");
    }
  };

  if (!sessionData) return <p className="p-4">Cargando datos de la sesión...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Breadcrumb pageName="Editar Sesión" />

      {library === "material" ? (
        <GenericFormMUI
          open={true}
          title="Editar Sesión"
          fields={sessionFields}
          initialData={sessionData}
          onClose={() => navigate("/sessions")}
          onSubmit={handleUpdateSession}
        />
      ) : (
        <div className="mt-6">
          <GenericTailwindForm
            fields={sessionFields}
            initialData={sessionData}
            onSubmit={handleUpdateSession}
            onCancel={() => navigate("/sessions")}
          />
        </div>
      )}
    </div>
  );
};

export default UpdateSession;
