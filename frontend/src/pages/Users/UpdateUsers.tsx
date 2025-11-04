import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { userService } from "../../services/userService";
import { User } from '../../models/user';
import Breadcrumb from "../../components/Breadcrumb";

// Formularios disponibles
import GenericFormMUI from "../../components/common/MaterialUI/GenericFormMUI";
import TailwindUserForm from "../../components/TailWind/TailwindUserForm";

const UpdateUser: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    // Campos del formulario
    const updateFields = [
        { name: "name", label: "Nombre", type: "text" as const },
        { name: "email", label: "Correo", type: "email" as const },
        { name: "phone", label: "Teléfono", type: "text" as const },
        { name: "city", label: "Ciudad", type: "text" as const },
    ];

    // Cargar datos del usuario
    useEffect(() => {
        const fetchUser = async () => {
            if (!id) return;
            const userData = await userService.getUserById(parseInt(id));
            setUser(userData);
        };
        fetchUser();
    }, [id]);

    // Memorizar usuario
    const memoizedUser = useMemo(() => user, [user]);

    // Actualización
    const handleUpdateUser = async (theUser: User) => {
        try {
            const updatedUser = await userService.updateUser(theUser.id || 0, theUser);
            if (updatedUser) {
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
                    text: "Existe un problema al momento de actualizar el registro",
                    icon: "error",
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el registro",
                icon: "error",
                timer: 3000,
            });
        }
    };

    if (!user) return <div>Cargando...</div>;

    return (
        <>
            <Breadcrumb pageName="Actualizar Usuario" />

            {/* Formulario Material UI */}
            <GenericFormMUI
                open={true}
                title="Actualizar Usuario"
                fields={updateFields}
                initialData={memoizedUser || {}}
                onSubmit={handleUpdateUser}
                onClose={() => navigate("/users/list")}
            />

            {/* Formulario Tailwind */}
            <TailwindUserForm
                handleUpdate={handleUpdateUser}
                mode={2} // 2 = actualización
                user={user}
            />
        </>
    );
};

export default UpdateUser;
