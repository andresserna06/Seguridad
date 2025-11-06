import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getPermissionById, updatePermission } from "../../services/permissionService";
import GenericTailwindForm, { Field as TailwindField } from "../../components/common/TailWind/TailwindForm";
import GenericFormMUI, { FieldType as MUIField } from "../../components/common/MaterialUI/GenericFormMUI";

const UpdatePermission: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<any>({});
  const [open, setOpen] = useState(true); // Control del modal MUI

  // 👇 Cambia esta constante para alternar entre "tailwind" y "material"
  const library: "tailwind" | "material" = "material";

  const fields = [
    { name: "url", label: "URL", type: "text", required: true },
    {
      name: "method",
      label: "Método",
      type: "select",
      required: true,
      options: [
        { value: "GET", label: "GET" },
        { value: "POST", label: "POST" },
        { value: "PUT", label: "PUT" },
        { value: "DELETE", label: "DELETE" },
      ],
    },
    { name: "entity", label: "Entidad", type: "text" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const data = await getPermissionById(Number(id));
        setInitialData(data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "No se pudo cargar el permiso", "error");
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (data: any) => {
    try {
      if (!data.entity) data.entity = "";
      await updatePermission(Number(id), data);
      Swal.fire("Actualizado", "El permiso se ha actualizado correctamente", "success");
      navigate("/permissions");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo actualizar el permiso", "error");
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/permissions");
  };

  const formInitialData = {
    url: "",
    method: "GET",
    entity: "",
    ...initialData,
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Actualizar Permiso</h2>

      {library === "material" ? (
        <GenericFormMUI
          open={open}
          title="Editar Permiso"
          fields={fields as MUIField[]}
          initialData={formInitialData}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      ) : (
        <GenericTailwindForm
          title="Editar Permiso"
          fields={fields as TailwindField[]}
          initialData={formInitialData}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      )}
    </div>
  );
};

export default UpdatePermission;
