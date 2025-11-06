import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createPermission } from "../../services/permissionService";
import GenericTailwindForm, { Field as TailwindField } from "../../components/common/TailWind/TailwindForm";
import GenericFormMUI, { FieldType as MUIField } from "../../components/common/MaterialUI/GenericFormMUI";

const CreatePermission: React.FC = () => {
  const navigate = useNavigate();
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
    { name: "entity", label: "Entidad (opcional)", type: "text" },
  ];

  const handleSubmit = async (data: any) => {
    try {
      await createPermission(data);
      Swal.fire("✅ Creado", "El permiso se ha creado correctamente", "success");
      navigate("/permissions");
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "No se pudo crear el permiso", "error");
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/permissions");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Crear Permiso</h2>

      {library === "material" ? (
        <GenericFormMUI
          open={open}
          title="Crear Permiso"
          fields={fields as MUIField[]}
          initialData={{ url: "", method: "GET", entity: "" }}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      ) : (
        <GenericTailwindForm
          title="Crear Permiso"
          fields={fields as TailwindField[]}
          initialData={{ url: "", method: "GET", entity: "" }}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      )}
    </div>
  );
};

export default CreatePermission;
