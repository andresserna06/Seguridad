import React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { sessionService } from "../../services/sessionService";
import GenericFormMUI from "../../components/common/MaterialUI/GenericFormMUI";
import GenericTailwindForm from "../../components/common/TailWind/TailwindForm";
import { useLibrary } from "../../context/LibraryContext";
import Swal from "sweetalert2";

export const CreateSession: React.FC = () => {
  const navigate = useNavigate();
  const { library } = useLibrary();

  const sessionFields = [
    { name: "userId", label: "ID del Usuario", type: "number" as const, required: true },
    { name: "token", label: "Token", type: "text" as const, required: true },
    { name: "expiration", label: "Expiración", type: "datetime-local" as const, required: true },
    { name: "FACode", label: "Código 2FA (opcional)", type: "text" as const },
    { name: "state", label: "Estado", type: "select" as const, required: true, 
      options: [
      { value: "active", label: "Activo" },
      { value: "inactive", label: "Inactivo"}
    ]
    },
  ];

  const handleCreateSession = async (data: any) => {
    try {
      const { userId, expiration, ...sessionData } = data;
      
      // Convertir el datetime-local al formato requerido por Python: "YYYY-MM-DD HH:MM:SS"
      const formattedExpiration = expiration.replace("T", " ") + ":00";
      
      const response = await sessionService.createSession(Number(userId), {
        ...sessionData,
        expiration: formattedExpiration
      });
      
      if (response) {
        Swal.fire("✅ Sesión creada correctamente");
        navigate("/sessions");
      } else {
        Swal.fire("❌ Error al crear la sesión");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error inesperado al crear la sesión");
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