import React from "react";
import { useNavigate } from "react-router-dom";
import GenericFormMUI from "../../components/common/MaterialUI/GenericFormMUI";
import { useLibrary } from "../../context/LibraryContext";
import { createRole } from "../../services/roleService";
import Breadcrumb from "../../components/Breadcrumb";
import GenericTailwindForm, { FieldType } from "../../components/common/TailWind/GenericTailwindForm"; // solo para tipado, se puede ignorar el uso de password/email

const CreateRole: React.FC = () => {
  const navigate = useNavigate();
  const { library } = useLibrary();

  const fields: FieldType[] = [
    { name: "name", label: "Nombre", type: "text", required: true },
    { name: "description", label: "Descripción", type: "text", required: true },
  ];

  const handleSubmit = async (formData: any) => {
    await createRole(formData);
    navigate("/roles");
  };

  return (
    <div>
      <Breadcrumb pageName="Crear Rol" />

      {library === "material" ? (
        <GenericFormMUI
          open={true}
          fields={fields}
          initialData={{}}
          onClose={() => navigate("/roles")}
          onSubmit={handleSubmit}
        />
      ) : (
        <GenericTailwindForm
          open={true}
          fields={fields}
          initialData={{}}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/roles")}
          
        />
      )}

      
    </div>
  );
};

export default CreateRole;
