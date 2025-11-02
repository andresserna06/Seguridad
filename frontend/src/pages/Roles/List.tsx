import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericTableMUI from "../../components/common/MaterialUI/GenericTableMUI";
import { getRoles, deleteRole } from "../../services/roleService"; // asegurarse de exportar deleteRole
import Swal from "sweetalert2";

const RolesList = () => {
    const [roles, setRoles] = useState<any[]>([]);
    const navigate = useNavigate();

    const columns = ["id", "name", "description"];
    const actions = [
        { name: "edit", label: "Editar" },
        { name: "delete", label: "Eliminar" },
        { name: "permissions", label: "Permisos" },
    ];

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const data = await getRoles();
            setRoles(data);
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    };

    const handleAdd = () => {
        navigate("/roles/create");
    };

    const handleAction = async (action: string, item: any) => {
        if (action === "edit") {
            navigate(`/roles/update/${item.id}`);
        } else if (action === "delete") {
            await handleDelete(item);
        } else if (action === "permissions") { //  manejar permisos aquí
            navigate(`/roles/${item.id}/permissions`);
        }
    };

    const handleDelete = async (item: any) => {
        Swal.fire({
            title: "Eliminar Rol",
            text: "¿Está seguro de eliminar este rol?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteRole(item.id); // función del service
                    Swal.fire("Eliminado", "El rol ha sido eliminado", "success");
                    fetchRoles(); // refresca la lista
                } catch (error) {
                    console.error("Error deleting role:", error);
                    Swal.fire("Error", "No se pudo eliminar el rol", "error");
                }
            }
        });
    };

    return (
        <div>

            <GenericTableMUI
                title="Roles"
                data={roles}
                columns={columns}
                actions={actions}
                onAdd={handleAdd}
                onAction={handleAction}
            />
        </div>
    );
};

export default RolesList;
