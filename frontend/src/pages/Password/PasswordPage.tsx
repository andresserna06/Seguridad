// src/pages/PasswordPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GenericTableMUI from "../../components/common/MaterialUI/GenericTableMUI";
import GenericFormMUI from "../../components/common/MaterialUI/GenericFormMUI";
import GenericButtonMUI from "../../components/common/MaterialUI/GenericButtonMUI";
import { getUserById } from "../../services/userService";
import {
    getPasswords,
    createPassword,
    updatePassword,
    deletePassword,
} from "../../services/passwordService";
import { Password } from "../../models/password";

const PasswordPage: React.FC = () => {
    const { id } = useParams(); // ID del usuario
    const navigate = useNavigate();

    const [user, setUser] = useState<any | null>(null);
    const [passwords, setPasswords] = useState<Password[]>([]);
    const [openForm, setOpenForm] = useState(false);
    const [editingPassword, setEditingPassword] = useState<Password | null>(null);

    // === Cargar datos de usuario y contraseñas ===
    useEffect(() => {
        if (id) fetchUserData();
    }, [id]);

    const fetchUserData = async () => {
        try {
            const userData = await getUserById(Number(id));
            setUser(userData);

            const allPasswords = await getPasswords();
            const userPasswords = allPasswords.filter(
                (p) => p.user_id === Number(id)
            );
            setPasswords(userPasswords);
        } catch (error) {
            console.error("Error cargando datos del usuario:", error);
            Swal.fire("Error", "No se pudieron cargar los datos del usuario", "error");
        }
    };

    // === Abrir modal para agregar ===
    const handleAdd = () => {
        setEditingPassword(null);
        setOpenForm(true);
    };

    // === Abrir modal para editar ===
    const handleEdit = (password: Password) => {
        setEditingPassword(password);
        setOpenForm(true);
    };

    // === Eliminar contraseña ===
    const handleDelete = async (password: Password) => {
        Swal.fire({
            title: "Eliminar Contraseña",
            text: "¿Está seguro de eliminar esta contraseña?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then(async (result) => {
            if (result.isConfirmed && password.id) {
                try {
                    await deletePassword(password.id);
                    Swal.fire("Eliminado", "Contraseña eliminada correctamente", "success");
                    fetchUserData();
                } catch (error) {
                    console.error("Error eliminando contraseña:", error);
                    Swal.fire("Error", "No se pudo eliminar la contraseña", "error");
                }
            }
        });
    };

    // === Guardar (crear o actualizar) ===
    const handleSubmit = async (formData: Record<string, any>) => {
        try {
            // Fechas automáticas
            const now = new Date();
            const startAt = now;
            const endAt = new Date(now.getFullYear(), 11, 31, 23, 59, 59);

            const payload: Omit<Password, "id"> = {
                user_id: Number(id),
                content: formData.content,
                startAt,
                endAt,
            };

            if (editingPassword?.id) {
                const updated = await updatePassword(editingPassword.id, payload);
                if (updated) {
                    Swal.fire("Actualizado", "Contraseña actualizada correctamente", "success");
                    setOpenForm(false);
                    fetchUserData();
                } else {
                    Swal.fire("Error", "No se pudo actualizar la contraseña", "error");
                }
            } else {
                const created = await createPassword(payload);
                if (created) {
                    Swal.fire("Creado", "Contraseña creada correctamente", "success");
                    setOpenForm(false);
                    fetchUserData();
                } else {
                    Swal.fire("Error", "No se pudo crear la contraseña", "error");
                }
            }

            setOpenForm(false);
            fetchUserData();
        } catch (error) {
            console.error("Error guardando contraseña:", error);
            Swal.fire("Error", "No se pudo guardar la contraseña", "error");
        }
    };

    // === Configuración tabla ===
    const columns = [
        { key: "id", label: "ID" },
        { key: "content", label: "Contraseña" }
    ];

    const actions = [
        { name: "edit", label: "Editar" },
        { name: "delete", label: "Eliminar" },
    ];

    const handleAction = (name: string, item: Record<string, any>) => {
        const password = item as Password;
        if (name === "edit") handleEdit(password);
        else if (name === "delete") handleDelete(password);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Contraseñas del Usuario: {user?.name}</h2>

            <GenericTableMUI
                data={passwords}
                columns={columns}
                actions={actions}
                onAction={handleAction}
                onAdd={handleAdd}
            />

            <GenericFormMUI
                open={openForm}
                title={editingPassword ? "Editar Contraseña" : "Agregar Contraseña"}
                fields={[{ name: "content", label: "Contraseña", type: "text" as const, required: true }]}
                initialData={editingPassword || { content: "" }}
                onClose={() => setOpenForm(false)}
                onSubmit={handleSubmit}
            />

            <GenericButtonMUI
                label="← Volver a Usuarios"
                onClick={() => navigate("/users")}
                color="primary"
                sx={{ marginTop: 2 }}
            />
        </div>
    );
};

export default PasswordPage;
