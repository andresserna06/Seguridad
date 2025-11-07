import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GenericFormMUI from "../../components/common/MaterialUI/GenericFormMUI";
import { getRoleById, updateRole } from "../../services/roleService";
import { useLibrary } from "../../context/LibraryContext";
import GenericTailwindForm from "../../components/common/TailWind/TailwindForm";


const UpdateRole: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [role, setRole] = useState<any>(null);
  const { library } = useLibrary();

  // Definir los campos del formulario
  // Campos del formulario
  const fields = [
    { name: "name", label: "Nombre", type: "text" as const, required: true },
    { name: "description", label: "Descripción", type: "text" as const, required: true },
  ];



  // Cargar datos del rol al montar el componente
  useEffect(() => {
    if (!id) return;
    const fetchRole = async () => {
      try {
        const data = await getRoleById(Number(id));
        setRole(data);
      } catch (error) {
        console.error("Error fetching role:", error);
        Swal.fire("Error", "No se pudo cargar el rol", "error");
      }
    };
    fetchRole();
  }, [id]);

  // Función para actualizar el rol
  const handleSubmit = async (formData: any) => {
    try {
      await updateRole(Number(id), formData);
      Swal.fire({
        title: "Actualizado",
        text: "El rol se ha actualizado correctamente",
        icon: "success",
        timer: 2500,
      });
      navigate("/roles");
    } catch (error) {
      console.error("Error updating role:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar el rol",
        icon: "error",
        timer: 2500,
      });
    }
  };

  if (!role) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Actualizar Rol</h2>
      {library === "material" ? (
        <GenericFormMUI
          open={true}
          title="Actualizar Rol"
          fields={fields}
          initialData={role}
          onClose={() => navigate("/roles")}
          onSubmit={handleSubmit}
        />
      ) : (
        <GenericTailwindForm
          fields={fields}
          initialData={role}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/roles")}
        />
      )}
    </div>
  );
};

export default UpdateRole;
