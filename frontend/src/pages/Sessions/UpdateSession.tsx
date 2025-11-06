import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { sessionService } from "../../services/sessionService";
import GenericFormMUI from "../../components/common/MaterialUI/GenericFormMUI";
import GenericTailwindForm from "../../components/common/TailWind/TailwindForm";
import { useLibrary } from "../../context/LibraryContext"; // 👈 importa el contexto

const UpdateSession: React.FC = () => {
  const { library } = useLibrary(); // 👈 usa el contexto aquí
  const [sessionData, setSessionData] = useState<any>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const sessionFields = [
    { name: "token", label: "Token", type: "text" as const, required: true },
    { name: "expiration", label: "Expiración", type: "text" as const, required: true },
    { name: "FACode", label: "Código 2FA (opcional)", type: "text" as const },
    { name: "state", label: "Estado", type: "text" as const, required: true },
  ];

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await sessionService.getById(String(id));
        if (!data) {
          alert("❌ Sesión no encontrada");
          navigate("/sessions");
          return;
        }
        setSessionData(data);
      } catch (error) {
        console.error(error);
        alert("Error al cargar la sesión");
      }
    };
    fetchSession();
  }, [id, navigate]);

  const handleUpdateSession = async (data: any) => {
    try {
      const response = await sessionService.updateSession(String(id), data);
      if (response) {
        alert("✅ Sesión actualizada correctamente");
        navigate("/sessions");
      } else {
        alert("❌ Error al actualizar la sesión");
      }
    } catch (error) {
      console.error(error);
      alert("Error inesperado al actualizar la sesión");
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
            title="Editar Sesión"
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
