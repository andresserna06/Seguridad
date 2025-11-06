import React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { sessionService } from "../../services/sessionService";
import GenericFormMUI from "../../components/common/MaterialUI/GenericFormMUI";
import GenericTailwindForm from "../../components/common/TailWind/TailwindForm";
import { useLibrary } from "../../context/LibraryContext"; // ✅ importante

export const CreateSession: React.FC = () => {
  const navigate = useNavigate();
  const { library } = useLibrary(); // ✅ lee la librería global

  const sessionFields = [
    { name: "userId", label: "ID del Usuario", type: "number" as const, required: true },
    { name: "token", label: "Token", type: "text" as const, required: true },
    { name: "expiration", label: "Expiración", type: "text" as const, required: true },
    { name: "FACode", label: "Código 2FA (opcional)", type: "text" as const },
    { name: "state", label: "Estado", type: "text" as const, required: true },
  ];

  const handleCreateSession = async (data: any) => {
    try {
      const { userId, ...sessionData } = data;
      const response = await sessionService.createSession(Number(userId), sessionData);
      if (response) {
        alert("✅ Sesión creada correctamente");
        navigate("/sessions");
      } else {
        alert("❌ Error al crear la sesión");
      }
    } catch (error) {
      console.error(error);
      alert("Error inesperado al crear la sesión");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Breadcrumb pageName="Crear Sesión" />

      {library === "material" ? (
        <GenericFormMUI
          open={true}
          title="Crear Sesión"
          fields={sessionFields}
          onClose={() => navigate("/sessions")}
          onSubmit={handleCreateSession}
        />
      ) : (
        <div className="mt-6">
          <GenericTailwindForm
            title="Crear Sesión"
            fields={sessionFields}
            onSubmit={handleCreateSession}
            onCancel={() => navigate("/sessions")}
          />
        </div>
      )}
    </div>
  );
};

export default CreateSession;
