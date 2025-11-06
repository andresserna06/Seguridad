import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createPermission } from "../../services/permissionService";
import GenericTailwindForm, { Field as TailwindField } from "../../components/common/TailWind/TailwindForm";
import GenericFormMUI, { FieldType as MUIField } from "../../components/common/MaterialUI/GenericFormMUI";
import { useLibrary } from "../../context/LibraryContext"; // 👈 Importa el contexto

const CreatePermission: React.FC = () => {
  const navigate = useNavigate();
  const { library } = useLibrary(); // 👈 Usa la librería seleccionada globalmente

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
    navigate("/permissions");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Crear Permiso</h2>

      {library === "material" ? (
        <GenericFormMUI
          open={true}
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
          onCancel={() => navigate(`/permissions`)}
        />
      )}
    </div>
  );
};

export default CreatePermission;
