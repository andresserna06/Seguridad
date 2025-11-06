import React, { useEffect, useState } from "react";
import { Session } from "../../models/session";
import TailwindTable from "../../components/common/TailWind/TailwindTable";
import { sessionService } from "../../services/sessionService";
 // ejemplo

const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
  }, []);

  const handleAction = (action: string, session: Session) => {
    if (action === "delete") {
      sessionService.deleteSession(session.id!).then(() => {
        setSessions((prev) => prev.filter((s) => s.id !== session.id));
      });
    }
    if (action === "edit") {
      // aquí puedes abrir un modal para editar sesión
      console.log("Editar sesión:", session);
    }
  };

  const handleAddSession = () => {
    console.log("Crear nueva sesión");
    // podrías abrir un modal para crear una nueva sesión
  };

  return (
    <div className="p-6">
      <TailwindTable
        title="Sesiones Activas"
        data={sessions}
        columns={["id", "user_id", "token", "expiration", "state"]}
        actions={[
          { name: "edit", label: "Editar" },
          { name: "delete", label: "Eliminar" },
        ]}
        onAction={handleAction}
        onAdd={handleAddSession}
        addButtonLabel="Crear Sesión"
      />
    </div>
  );
};

export default SessionsPage;
