import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import GenericFormMUI from "../../components/common/MaterialUI/GenericFormMUI";
import GenericInfoCardMUI, { InfoItem, Action } from "../../components/common/MaterialUI/GenericInfoCardMUI";
import { userService } from "../../services/userService";
import { getAddresses, createAddress, updateAddress, deleteAddress } from "../../services/addressService";
import { Address } from "../../models/address";
import GenericButtonMUI from "../../components/common/MaterialUI/GenericBottonMUI";
import { useNavigate } from "react-router-dom";

const AddressPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // id del usuario
    const [user, setUser] = useState<any | null>(null);
    const [userAddress, setUserAddress] = useState<Address | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (id) fetchUserAddress();
    }, [id]);

    const fetchUserAddress = async () => {
        const userData = await userService.getUserById(parseInt(id!));
        setUser(userData);

        const addresses = await getAddresses();
        const foundAddress = addresses.find(addr => addr.user_id === parseInt(id!));
        setUserAddress(foundAddress ?? null);
    };

    const handleSubmit = async (formData: Record<string, any>) => {
        const payload: Omit<Address, "id"> = {
            street: formData.street,
            number: formData.number,
            latitude: Number(formData.latitude),
            longitude: Number(formData.longitude),
            user_id: parseInt(id!),
        };

        try {
            let savedAddress: Address | null = null;
            if (userAddress?.id) {
                savedAddress = await updateAddress(userAddress.id, payload);
            } else {
                savedAddress = await createAddress(payload);
            }

            if (!savedAddress) throw new Error("Error guardando dirección");
            setUserAddress(savedAddress);
            setOpen(false);
            Swal.fire("Completado", "Dirección guardada correctamente", "success");
        } catch {
            Swal.fire("Error", "No se pudo guardar la dirección", "error");
        }
    };

    const handleDelete = async () => {
    if (!userAddress?.id) return;
     
    const addressId = userAddress.id;

    Swal.fire({
        title: "Eliminar Dirección",
        text: "¿Está seguro de eliminar esta dirección?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const deleted = await deleteAddress(addressId);
                if (deleted) {
                    setUserAddress(null);
                    Swal.fire("Eliminado", "La dirección ha sido eliminada", "success");
                } else {
                    throw new Error("Error eliminando");
                }
            } catch (error) {
                console.error("Error eliminando dirección:", error);
                Swal.fire("Error", "No se pudo eliminar la dirección", "error");
            }
        }
    });
};


    const fields = [
        { name: "street", label: "Calle", type: "text" as const },
        { name: "number", label: "Número", type: "text" as const },
        { name: "latitude", label: "Latitud", type: "number" as const },
        { name: "longitude", label: "Longitud", type: "number" as const },
    ];

    const info: InfoItem[] = userAddress
        ? [
            { label: "Calle", value: userAddress.street },
            { label: "Número", value: userAddress.number },
            { label: "Latitud", value: userAddress.latitude ?? "No definido" },
            { label: "Longitud", value: userAddress.longitude ?? "No definido" },
        ]
        : [];

    const actions: Action[] = userAddress
        ? [
            { label: "Editar", onClick: () => setOpen(true), color: "primary" },
            { label: "Eliminar", onClick: handleDelete, color: "error" },
        ]
        : [];

    return (
        <div style={{ padding: "20px" }}>
            <GenericInfoCardMUI
                title={`Dirección del Usuario ${user?.name}`}
                info={info}
                url={userAddress ? `https://maps.google.com/maps?q=${userAddress.latitude},${userAddress.longitude}&z=15&output=embed` : undefined}
                actions={actions}
                emptyState={!userAddress ? { label: "Sin dirección registrada", onAdd: () => setOpen(true) } : undefined}
            />
            <GenericButtonMUI
                label="← Volver a Usuarios"
                onClick={() => navigate("/users/list")}
                color="primary"
            />

            <GenericFormMUI
                open={open}
                title={userAddress ? "Actualizar Dirección" : "Agregar Dirección"}
                fields={fields}
                initialData={userAddress || {}}
                onClose={() => setOpen(false)}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default AddressPage;
