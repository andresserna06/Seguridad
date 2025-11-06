// src/pages/AddressPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import GenericFormMUI from "../../components/common/MaterialUI/GenericFormMUI";
import GenericInfoCardMUI, { InfoItem, Action } from "../../components/common/MaterialUI/GenericInfoCardMUI";
import { getUserById } from "../../services/userService";
import { getAddresses, createAddress, updateAddress, deleteAddress } from "../../services/addressService";
import { Address } from "../../models/address";
import { useLibrary } from "../../context/LibraryContext";
import TailwindAddress from "../../components/common/TailWind/TailwindAddress";
import GenericTailwindForm from "../../components/common/TailWind/GenericTailwindForm";



const DEFAULT_COORDS = { lat: 4.60971, lng: -74.08175 }; // Bogotá por defecto

const AddressPage: React.FC = () => {

    const { library } = useLibrary();
    const { id } = useParams();
    const [user, setUser] = useState<any | null>(null);
    const [userAddress, setUserAddress] = useState<Address | null>(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) fetchUserAddress();
    }, [id]);

    const fetchUserAddress = async () => {
        try {
            const userData = await getUserById(parseInt(id!));
            setUser(userData);

            const addresses = await getAddresses();
            const foundAddress = addresses.find(addr => addr.user_id === parseInt(id!));
            setUserAddress(foundAddress ?? null);
        } catch (error) {
            console.error("Error cargando dirección:", error);
            Swal.fire("Error", "No se pudo cargar la dirección del usuario", "error");
        }
    };

    const handleSubmit = async (formData: Record<string, any>) => {
        try {
            // Construimos la dirección completa
            const fullAddress = `${formData.street} ${formData.number}`;

            // Valores por defecto en caso de fallo
            let latitude = 0;
            let longitude = 0;

            try {
                // Llamada a Google Geocoding API
                const geoResponse = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=MI_API_KEY_REAL`
                );
                const geoData = await geoResponse.json();

                // Si encontró resultados, usamos las coordenadas reales
                if (geoData.status === "OK" && geoData.results.length > 0) {
                    latitude = geoData.results[0].geometry.location.lat;
                    longitude = geoData.results[0].geometry.location.lng;
                } else {
                    console.warn("No se encontraron coordenadas, usando valores por defecto");
                }
            } catch (geoError) {
                console.warn("Error al geocodificar la dirección, usando coordenadas por defecto", geoError);
            }

            // Payload para backend
            const payload: Omit<Address, "id"> = {
                street: formData.street,
                number: formData.number,
                latitude,
                longitude,
                user_id: parseInt(id!),
            };

            // Crear o actualizar dirección
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
        } catch (error) {
            console.error("Error guardando dirección:", error);
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
    ];

    const info: InfoItem[] = userAddress
        ? [
            { label: "Calle", value: userAddress.street },
            { label: "Número", value: userAddress.number },
            { label: "Latitud", value: userAddress.latitude ?? DEFAULT_COORDS.lat },
            { label: "Longitud", value: userAddress.longitude ?? DEFAULT_COORDS.lng },
        ]
        : [];

    const actions: Action[] = userAddress
        ? [
            { label: "Editar", onClick: () => setOpen(true), color: "primary" },
            { label: "Eliminar", onClick: handleDelete, color: "error" },
        ]
        : [];

    return (
        <div className="p-4">
            {library === "material" ? (
                <>
                    <GenericInfoCardMUI
                        title={`Dirección del Usuario ${user?.name}`}
                        info={info}
                        url={
                            userAddress
                                ? `https://maps.google.com/maps?q=${userAddress.latitude},${userAddress.longitude}&z=15&output=embed`
                                : undefined
                        }
                        actions={actions}
                        emptyState={
                            !userAddress
                                ? { label: "Sin dirección registrada", onAdd: () => setOpen(true) }
                                : undefined
                        }
                    />

                    <GenericFormMUI
                        open={open}
                        title={userAddress ? "Actualizar Dirección" : "Agregar Dirección"}
                        fields={fields}
                        initialData={userAddress || {}}
                        onClose={() => setOpen(false)}
                        onSubmit={handleSubmit}
                    />
                </>
            ) : (
                <>
                    {!open ? (
                        <TailwindAddress
                            title={`Dirección del Usuario ${user?.name}`}
                            info={info}
                            url={
                                userAddress
                                    ? `https://maps.google.com/maps?q=${userAddress.latitude},${userAddress.longitude}&z=15&output=embed`
                                    : undefined
                            }
                            actions={actions}
                            emptyState={
                                !userAddress
                                    ? { label: "Sin dirección registrada", onAdd: () => setOpen(true) }
                                    : undefined
                            }
                        />
                    ) : (
                        <GenericTailwindForm
                            open={open}
                            title={userAddress ? "Actualizar Dirección" : "Agregar Dirección"}
                            fields={fields}
                            initialData={userAddress || {}}
                            onSubmit={handleSubmit}
                            onCancel={() => setOpen(false)}
                        />
                    )}
                </>
            )}

            <button
                onClick={() => navigate("/users/list")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                ← Volver a Usuarios
            </button>

        </div>

    );
};


export default AddressPage;
