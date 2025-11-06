import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TailwindTable from "../../components/common/TailWind/TailwindTable";
import { sessionService } from "../../services/sessionService";
import { userService } from "../../services/userService";
import { Session } from '../../models/session';
import { User } from '../../models/user';

const UserSessions: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchUserAndSessions(id);
    }
  }, [id]);

  const fetchUserAndSessions = async (userId: string) => {
    try {
      const userIdNumber = Number(userId);
      const [userData, sessionsData] = await Promise.all([
        userService.getUserById(userIdNumber),
        sessionService.getByUserId(userIdNumber)
      ]);
      
      setUser(userData);
      setSessions(sessionsData.map(session => ({
        ...session,
        expiration: session.expiration ? new Date(session.expiration).toLocaleString() : '',
        created_at: session.created_at ? new Date(session.created_at).toLocaleString() : '',
        updated_at: session.updated_at ? new Date(session.updated_at).toLocaleString() : ''
      })));
    } catch (err) {
      console.error(err);
    }
  };

  const columns: (keyof Session)[] = ["id", "token", "state", "expiration", "FACode", "created_at", "updated_at"];
  const actions = [
    { name: "delete", label: "Eliminar" },
  ];

  const handleAction = async (action: string, item: Session) => {
    if (action === "delete") {
      if (window.confirm('¿Está seguro de eliminar esta sesión?')) {
        if (item.id) {
          await sessionService.deleteSession(item.id);
          if (id) fetchUserAndSessions(id);
        }
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Sesiones de {user?.name || 'Usuario'}
        </h1>
        <button
          onClick={() => navigate("/users/list")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          ← Volver a Usuarios
        </button>
      </div>

      <TailwindTable
        data={sessions}
        columns={columns}
        actions={actions}
        title={`Sesiones activas`}
        onAction={handleAction}
      />
    </div>
  );
};

export default UserSessions;