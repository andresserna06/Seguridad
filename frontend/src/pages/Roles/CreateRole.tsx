//import React from "react";
import { useNavigate } from "react-router-dom";
import GenericFormMUI from "../../components/common/MaterialUI/GenericFormMUI";
import { createRole } from "../../services/roleService";
import Breadcrumb from "../../components/Breadcrumb";

const CreateRole = () => {
  const navigate = useNavigate();

  const fields = [
    { name: "name", label: "Nombre" },
    { name: "description", label: "Descripción" },
  ];

  const handleSubmit = async (formData: any) => {
    await createRole(formData);
    navigate("/roles"); // volver a la lista
  };

  return (
    <div> <Breadcrumb pageName="Crear Rol" />
      <GenericFormMUI
        open={true} // no importa, estamos usando la página completa
        fields={fields}
        initialData={{}}
        onClose={() => navigate("/roles")}
        onSubmit={handleSubmit}
      />

    </div>

  );
};

export default CreateRole;
