"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { createUser } from "../../services/userService";
import { User } from "../../models/user";
import GenericFormMUI from "../../components/common/MaterialUI/GenericFormMUI";

const App = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true); // controla el modal

  // Campos del formulario (se pueden adaptar según tu modelo)
  const userFields = [
    { name: "name", label: "Nombre", type: "text" as const, required: true },
    { name: "email", label: "Correo", type: "email" as const, required: true },
    { name: "phone", label: "Teléfono", type: "text" as const, required: true },
    { name: "city", label: "Ciudad", type: "text" as const, required: true },
  ];

  // Crear usuario
  const handleCreateUser = async (formData: Record<string, any>) => {
    try {
      const createdUser = await createUser(formData as User);
      if (createdUser) {
        Swal.fire({
          title: "Completado",
          text: "Se ha creado correctamente el registro",
          icon: "success",
          timer: 3000,
        });
        setOpen(false); // cerrar modal
        navigate("/users");
      } else {
        Swal.fire({
          title: "Error",
          text: "Ocurrió un problema al crear el usuario",
          icon: "error",
          timer: 3000,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo crear el usuario",
        icon: "error",
        timer: 3000,
      });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Breadcrumb pageName="Crear Usuario" />
      
      {/* Formulario genérico en modal */}
      <GenericFormMUI
        open={open}
        title="Crear Usuario"
        fields={userFields}
        onClose={() => navigate("/users")}
        onSubmit={handleCreateUser}
      />
    </div>
  );
};

export default App;
