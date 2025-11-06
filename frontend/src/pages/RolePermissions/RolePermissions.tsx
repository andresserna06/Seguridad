// src/pages/RolePermissions/RolePermissions.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TailwindTable from "../../components/common/TailWind/TailwindTable";
import GenericTableMUI from "../../components/common/MaterialUI/GenericTableMUI";
import { Checkbox } from "@mui/material";
import { rolePermissionService, PermissionGroup } from "../../services/rolePermissionService";
import { useLibrary } from "../../context/LibraryContext";
import Swal from "sweetalert2";

interface PermissionRow {
  id: number;
  url: string;
  method: string;
  has_permission: boolean;
  entity: string;
}

const RolePermissions: React.FC = () => {
  const { id: roleId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { library } = useLibrary(); // 📌 Librería elegida
  const [permissions, setPermissions] = useState<PermissionGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPermissions = async () => {
      if (!roleId) return;

      try {
        const perms = await rolePermissionService.getByRoleId(parseInt(roleId));
        setPermissions(perms);
      } catch (error) {
        console.error("❌ Error cargando permisos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [roleId]);

  const handleCheckboxChange = (groupIndex: number, permIndex: number) => {
    const newPermissions = [...permissions];
    const perm = newPermissions[groupIndex].permissions[permIndex];
    perm.has_permission = !perm.has_permission;
    setPermissions(newPermissions);
  };

  const handleSave = async () => {
    if (!roleId) return;

    for (const group of permissions) {
      for (const perm of group.permissions) {
        try {
          if (perm.has_permission) {
            await rolePermissionService.createRolePermission(parseInt(roleId), perm.id);
          } else {
            await rolePermissionService.deleteRolePermission(parseInt(roleId), perm.id);
          }
        } catch (error) {
          console.error("❌ Error guardando permiso:", error);
        }
      }
    }

    Swal.fire({
                        title: "Completado",
                        text: "Permiso configurado exitosamente",
                        icon: "success",
                        timer: 3000,
                    });
  };

  if (loading) return <p>Cargando permisos...</p>;

  // Convertimos los datos a un array plano para la tabla
  const tableData: PermissionRow[] = [];
  permissions.forEach((group) => {
    group.permissions.forEach((perm) => {
      tableData.push({ ...perm, entity: group.entity });
    });
  });

  // Configuración MUI con checkbox funcional
  const muiColumns: {
    key: string;
    label: string;
    render?: (row: Record<string, any>) => React.ReactNode;
  }[] = [
    { key: "entity", label: "Entidad" },
    { key: "url", label: "Ruta" },
    { key: "method", label: "Método" },
    {
      key: "has_permission",
      label: "Activo",
      render: (row: Record<string, any>) => {
        const r = row as PermissionRow;
        const groupIndex = permissions.findIndex((g) => g.entity === r.entity);
        const permIndex = permissions[groupIndex].permissions.findIndex((p) => p.id === r.id);

        return (
          <Checkbox
            checked={r.has_permission}
            onChange={() => handleCheckboxChange(groupIndex, permIndex)}
            color="primary"
          />
        );
      },
    },
  ];

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Permisos del Rol {roleId}</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
          >
            Volver
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
          >
            Guardar cambios
          </button>
        </div>
      </div>

      {library === "material" ? (
        <GenericTableMUI
          data={tableData}
          columns={muiColumns}
          actions={[]} // Sin acciones extra
        />
      ) : (
        <TailwindTable
          data={tableData}
          columns={["entity", "url", "method", "has_permission"]}
          renderCell={(item, col) => {
            switch (col) {
              case "entity":
                return item.entity;
              case "url":
                return item.url;
              case "method":
                return item.method;
              case "has_permission":
                const groupIndex = permissions.findIndex((g) => g.entity === item.entity);
                const permIndex = permissions[groupIndex].permissions.findIndex((p) => p.id === item.id);
                return (
                  <input
                    type="checkbox"
                    checked={item.has_permission}
                    onChange={() => handleCheckboxChange(groupIndex, permIndex)}
                  />
                );
              default:
                return item[col];
            }
          }}
        />
      )}
    </div>
  );
};

export default RolePermissions;
