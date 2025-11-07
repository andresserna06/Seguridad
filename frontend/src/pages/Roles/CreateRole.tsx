import React from "react";
import { useNavigate } from "react-router-dom";
import GenericFormMUI from "../../components/common/MaterialUI/GenericFormMUI";
import { useLibrary } from "../../context/LibraryContext";
import { createRole } from "../../services/roleService";
import Breadcrumb from "../../components/Breadcrumb";
import GenericTailwindForm from "../../components/common/TailWind/TailwindForm";

const CreateRole: React.FC = () => {
  const navigate = useNavigate();
  const { library } = useLibrary();

  const fields = [
    { name: "name", label: "Nombre", type: "text" as const, required: true },
    { name: "description", label: "Descripción", type: "text" as const, required: true },
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
