import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GenericFormMUI from "../../components/common/MaterialUI/GenericFormMUI";
import TailwindUserForm from "../../components/common/TailWind/TailwindUserForm";
import  { getUserById }  from "../../services/userService";
import { updateUser } from "../../services/userService";
import { User } from '../../models/user';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateUser: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    // Cargar datos del usuario
    useEffect(() => {
        const fetchUser = async () => {
            if (!id) return;
            const userData = await getUserById(parseInt(id));
            setUser(userData);
        };
        fetchUser();
    }, [id]);

    // Campos del formulario con la misma lógica que CreateUserRole
    const updateFields = [
        { name: "name", label: "Nombre", type: "text" as const},
        { name: "email", label: "Correo", type: "email" as const},
        { name: "phone", label: "Teléfono", type: "text" as const},
        { name: "city", label: "Ciudad", type: "text" as const},
    ];

    // Manejar actualización
    const handleUpdateUser = async (formData: Record<string, any>) => {
        if (!user) return;
        try {
            // Combinar id y datos actualizados
            const updatedUser: User = { ...user, ...formData };

            const result = await updateUser(updatedUser.id || 0, updatedUser);
            if (result) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000,
                });
                navigate("/users/list"); // Redirección unificada
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al actualizar el registro",
                    icon: "error",
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al actualizar el registro",
                icon: "error",
                timer: 3000,
            });
        }
    };

    if (!user) return <div>Cargando...</div>;

    return (
        <div>
            <Breadcrumb pageName="Actualizar Usuario" />

            <GenericFormMUI
                open={true}
                title="Actualizar Usuario"
                fields={updateFields}
                initialData={user} // Se asegura que los datos iniciales tengan id y valores
                onSubmit={handleUpdateUser}
                onClose={() => navigate("/users/list")}
            />

            {/* Formulario Tailwind */}
            <TailwindUserForm
                handleUpdate={handleUpdateUser}
                mode={2} // 2 = actualización
                user={user}
            />
        </div>
    );
};

export default UpdateUser;
