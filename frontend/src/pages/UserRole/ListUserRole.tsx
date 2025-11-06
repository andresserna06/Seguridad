import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsers } from "../../services/userService";
import { getRoleById } from "../../services/roleService";
import { getUserRoles, deleteUserRole } from "../../services/userRoleService";
import GenericTableMUI from "../../components/common/MaterialUI/GenericTableMUI";
import { Role } from "../../models/role";
import { User } from "../../models/user";
import { UserRole } from "../../models/userRole";
import TailwindTable from "../../components/common/TailWind/TailwindTable";
import Breadcrumb from "../../components/Breadcrumb";
import GenericButtonMUI from "../../components/common/MaterialUI/GenericButtonMUI";
import Swal from "sweetalert2";
import { useLibrary } from "../../context/LibraryContext";

const ListUserRole: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { library } = useLibrary();

    const [role, setRole] = useState<Role | null>(null);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [filteredUserRoles, setFilteredUserRoles] = useState<UserRole[]>([]);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        if (!id) return;
        const roleId = parseInt(id);
        if (isNaN(roleId)) return;

        const [roleData, usersData, userRolesData] = await Promise.all([
            getRoleById(roleId),
            getUsers(),
            getUserRoles(),
        ]);

        if (!roleData) return;
        setRole(roleData);

        const filteredRoles = userRolesData.filter(ur => ur.role_id === roleId);

        const filteredUsersList = filteredRoles
            .map(ur => usersData.find(u => u.id === ur.user_id))
            .filter(Boolean) as User[];

        setFilteredUserRoles(filteredRoles);
        setFilteredUsers(filteredUsersList);
    };

    const handleAction = (action: string, user: User) => {
        if (action !== "delete" || !role) return;

        const userRole = filteredUserRoles.find(
            ur => ur.user_id === user.id && ur.role_id === role.id
        );
        if (!userRole) return;

        Swal.fire({
            title: "Eliminar Rol",
            text: `¿Está seguro de eliminar el rol ${role.name} para el usuario ${user.name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteUserRole(userRole.id!);
                    Swal.fire("Eliminado", `El rol fue eliminado para ${user.name}`, "success");
                    fetchData();
                } catch (error) {
                    console.error("Error eliminando rol:", error);
                    Swal.fire("Error", "No se pudo eliminar el rol", "error");
                }
            }
        });
    };

    const handleAdd = () => {
        navigate(`/user-roles/${id}/create`);
    };

    if (!role) return <p>Cargando...</p>;

    const muiColumns = [
        { key: "id", label: "ID Usuario" },
        { key: "name", label: "Nombre" },
        { key: "email", label: "Correo Electrónico" }
    ];

    const tailwindColumns: (keyof typeof filteredUsers[0])[] = ["id", "name", "email"];
    const actions = [{ name: "delete", label: "Eliminar Rol" }];

    return (
        <div style={{ padding: "20px" }}>
            <Breadcrumb pageName={`${role.name.toUpperCase()} - Usuarios`} />

            {library === "material" ? (
                <GenericTableMUI
                    data={filteredUsers}
                    columns={muiColumns}
                    actions={actions}
                    onAction={handleAction}
                    onAdd={handleAdd}
                />
            ) : (
                <TailwindTable
                    data={filteredUsers}
                    columns={tailwindColumns}
                    actions={actions}
                    onAction={handleAction}
                    onAdd={handleAdd}
                />
            )}

            <GenericButtonMUI
                label="← Volver a Roles"
                onClick={() => navigate("/roles")}
                sx={{ marginTop: "20px" }}
                color="primary"
            />
        </div>
    );
};

export default ListUserRole;
