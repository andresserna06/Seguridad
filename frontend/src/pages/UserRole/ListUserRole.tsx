import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsers } from "../../services/userService";
import { getRoleById } from "../../services/roleService";
import { getUserRoles, deleteUserRole } from "../../services/userRoleService";
import GenericTableMUI from "../../components/common/MaterialUI/GenericTableMUI";
import { Role } from "../../models/role";
import { User } from "../../models/user";
import { UserRole } from "../../models/userRole";
import Breadcrumb from "../../components/Breadcrumb";
import GenericButtonMUI from "../../components/common/MaterialUI/GenericBottonMUI";
import Swal from "sweetalert2";

const ListUserRole: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

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

        // Filtrar UserRoles del rol actual
        const filteredRoles = userRolesData.filter(ur => ur.role_id === roleId);

        // Mapear a usuarios completos
        const filteredUsersList = filteredRoles
            .map(ur => usersData.find(u => u.id === ur.user_id))
            .filter(Boolean) as User[];

        setFilteredUserRoles(filteredRoles);
        setFilteredUsers(filteredUsersList);
    };

    // Solo acción de eliminar
    const handleAction = (action: string, user: User) => {
        if (action !== "delete" || !role) return;

        // Buscar el UserRole correspondiente
        const userRole = filteredUserRoles.find(
            ur => ur.user_id === user.id && ur.role_id === role.id
        );
        console.log(userRole?.id);
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
                    await deleteUserRole(userRole.id!); // usamos el UUID del backend
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

    const columns = ["id", "name", "email"];
    const actions = [{ name: "delete", label: "Eliminar Rol" }];

    return (
        <div style={{ padding: "20px" }}>
            <Breadcrumb pageName={`${role.name.toUpperCase()} - Usuarios`} />

            <GenericTableMUI
                data={filteredUsers}
                columns={columns}
                actions={actions}
                onAction={handleAction}
                onAdd={handleAdd}
            />

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
