import React, { useState, useEffect } from "react";
import { User } from "../../../models/user";
import { Profile } from "../../../models/profile";
import { profileService } from "../../../services/profileService";

interface TailwindProfileProps {
  user: User;
  profile: Profile;
  onBack: () => void;
  onProfileUpdated: (profile: Profile) => void;
}

const TailwindProfile: React.FC<TailwindProfileProps> = ({
  user,
  profile: initialProfile,
  onBack,
  onProfileUpdated,
}) => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [phone, setPhone] = useState(profile.phone);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  useEffect(() => {
    setProfile(initialProfile);
    setPhone(initialProfile.phone);
  }, [initialProfile]);

  const handleSave = async () => {
    if (!profile.id) return;

    try {
      const updatedProfile = await profileService.updateProfile(
        profile.id,
        phone ?? "",
        photoFile || undefined
      );
      if (updatedProfile) {
        setProfile(updatedProfile);
        onProfileUpdated(updatedProfile);
        setEditing(false);
      }
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert("No se pudo actualizar el perfil");
    }
  };

  // Construir URL correcta de la imagen
  const photoURL = profile.photo
    ? `http://127.0.0.1:5000/api/profiles/${profile.photo.split("/").pop()}`
    : `${import.meta.env.BASE_URL}default-avatar.png`; // default-avatar.png en public/

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <div className="flex items-start gap-6">
        <img
          src={photoURL}
          alt="Perfil"
          className="w-32 h-32 object-cover rounded-lg border border-gray-300"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">
            Teléfono: {profile.phone || "No registrado"}
          </p>

          {editing && (
            <div className="mt-4 flex flex-col gap-3">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Teléfono"
                className="border rounded p-2 w-full"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-4 justify-end">
        {editing ? (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={handleSave}
          >
            Guardar
          </button>
        ) : (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => setEditing(true)}
          >
            Editar
          </button>
        )}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={onBack}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default TailwindProfile;
