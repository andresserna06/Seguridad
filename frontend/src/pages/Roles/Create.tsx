//import React from "react";
import { useNavigate } from "react-router-dom";
import GenericFormMUI from "../../components/common/MaterialUI/GenericFormMUI";
import { createRole } from "../../services/roleService";

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
    <GenericFormMUI
      open={true} // no importa, estamos usando la página completa
      fields={fields}
      initialData={{}}
      onClose={() => navigate("/roles")}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateRole;
