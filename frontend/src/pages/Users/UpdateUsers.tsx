import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { getUserById, updateUser } from "../../services/userService";
import { User } from "../../models/user";
import Breadcrumb from "../../components/Breadcrumb";
import GenericFormMUI from "../../components/common/MaterialUI/GenericFormMUI";

const UpdateUserPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    // Definir campos del formulario
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
            const userData = await getUserById(parseInt(id));
            setUser(userData);
        };
        fetchUser();
    }, [id]);

    // Memorizar el usuario para evitar recrear el objeto en cada render
    const memoizedUser = useMemo(() => user, [user]);

    // Manejar actualización
    const handleUpdateUser = async (theUser: User) => {
        try {
            const updatedUser = await updateUser(theUser.id || 0, theUser);
            if (updatedUser) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000,
                });
                navigate("/users");
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
            <GenericFormMUI
                open={true}
                title="Actualizar Usuario"
                fields={updateFields}
                initialData={memoizedUser || {}} // 👈 evita bucle
                onSubmit={handleUpdateUser}
                onClose={() => navigate("/users")}
            />
        </>
    );
};

export default UpdateUserPage;
