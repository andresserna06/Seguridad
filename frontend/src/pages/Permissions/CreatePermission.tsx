import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createPermission } from "../../services/permissionService";
import GenericTailwindForm, { Field } from "../../components/common/TailWind/TailwindForm";


const CreatePermission: React.FC = () => {
  const navigate = useNavigate();

  const fields: Field[] = [
    { name: "url", label: "URL", type: "text" },
    {
      name: "method",
      label: "Método",
      type: "select",
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
      Swal.fire("Creado", "El permiso se ha creado correctamente", "success");
      navigate("/permissions");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo crear el permiso", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Crear Permiso</h2>
      <GenericTailwindForm
        fields={fields}
        initialData={{}}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/permissions")}
      />
    </div>
  );
};

export default CreatePermission;
