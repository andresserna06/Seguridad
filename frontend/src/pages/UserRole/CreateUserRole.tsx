import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import GenericFormMUI from "../../components/common/MaterialUI/GenericFormMUI";
import { getRoleById } from "../../services/roleService";
import { getUsers } from "../../services/userService";
import { Role } from "../../models/role";
import { User } from "../../models/user";
import { createUserRole } from "../../services/userRoleService";
import { UserRole } from "../../models/userRole";
import { useLibrary } from "../../context/LibraryContext";
import GenericTailwindForm from "../../components/common/TailWind/GenericTailwindForm";

const CreateUserRole: React.FC = () => {
    const { id } = useParams(); // ID del rol
    const navigate = useNavigate();
    const { library } = useLibrary();

    const [role, setRole] = useState<Role | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const roleData = await getRoleById(Number(id));
            const usersData = await getUsers();
            setRole(roleData);
            setUsers(usersData);
        };
        fetchData();
    }, [id]);

    const fields = [
        {
            name: "user_id",
            label: "Seleccionar usuario",
            type: "select" as const,
            options: users.map((u) => ({
                value: u.id ?? 0,
                label: u.name ?? "Sin nombre",
            })),
            required: true,
        },
    ];


    const handleSubmit = async (formData: Record<string, any>) => {
        try {

            console.log(formData.user_id)
            const user_id = Number(formData.user_id);
            const role_id = Number(id);

            // Fechas automáticas
            const now = new Date();
            const start_At = now;
            const end_At = new Date(now.getFullYear(), 11, 31, 23, 59, 59);

            console.log(start_At);
            console.log(end_At);

            // Objeto completo tipo UserRole
            const newUserRole: Omit<UserRole, "id"> = {
                user_id,
                role_id,
                start_At,
                end_At,
            };

            const created = await createUserRole(newUserRole);
            console.log(created);

            if (created) {
                Swal.fire({
                    title: "Completado",
                    text: "Usuario agregado al rol correctamente",
                    icon: "success",
                    timer: 3000,
                });
                navigate(`/user-roles/${id}`);
            } else {
                throw new Error("No se pudo crear el UserRole");
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "No se pudo agregar el usuario al rol",
                icon: "error",
                timer: 3000,
            });
        }
    };

    if (!role) return <div>Cargando...</div>;

    return (
        <div>
            <Breadcrumb
                pageName={`AGREGAR USUARIO AL ROL ${role.name.toUpperCase()}`}
            />

            {library === "material" ? (
                <GenericFormMUI
                    open={true}
                    title={`Agregar usuario al rol ${role.name.toUpperCase()}`}
                    fields={fields}
                    onClose={() => navigate(`/user-roles/${id}`)}
                    onSubmit={handleSubmit}
                    initialData={{ user_id: "" }}
                />
            ) : (
                <GenericTailwindForm
                    open={true}
                    title={`Agregar usuario al rol ${role.name.toUpperCase()}`}
                    fields={fields}
                    initialData={{ user_id: "" }}
                    onSubmit={async (values) => handleSubmit(values)}
                    onCancel={() => navigate(`/user-roles/${id}`)}
                />
            )}
        </div>
    );
};

export default CreateUserRole;
