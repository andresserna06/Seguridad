import React, { useState, useEffect } from "react";
import { User } from "../../../models/user";
import { Profile } from "../../../models/profile";
import { profileService } from "../../../services/profileService";
import { Card, CardContent, Typography, Box, Button, TextField, Avatar } from "@mui/material";
import Swal from "sweetalert2";

interface MaterialProfileCardProps {
  user: User;
  profile: Profile;
  onBack: () => void;
  onProfileUpdated: (profile: Profile) => void;
}

const MaterialUIProfile: React.FC<MaterialProfileCardProps> = ({
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
      Swal.fire("No se pudo actualizar el perfil");
    }
  };

  const photoURL = profile.photo
    ? `http://127.0.0.1:5000/api/profiles/${profile.photo.split("/").pop()}`
    : `${import.meta.env.BASE_URL}default-avatar.png`;

  return (
    <Card sx={{ maxWidth: 600, margin: "0 auto", mt: 4, p: 2 }}>
      <CardContent>
        <Box display="flex" gap={3} alignItems="flex-start">
          <Avatar
            src={photoURL}
            alt="Perfil"
            sx={{ width: 120, height: 120, border: "1px solid #ccc" }}
          />

          <Box flex={1}>
            <Typography variant="h5">{user.name}</Typography>
            <Typography color="textSecondary">{user.email}</Typography>

            {!editing ? (
              <Typography color="textSecondary">
                Teléfono: {profile.phone || "No registrado"}
              </Typography>
            ) : (
              <Box mt={2} display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Teléfono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
                <Button
                  variant="contained"
                  component="label"
                  size="small"
                >
                  Cambiar foto
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                  />
                </Button>
              </Box>
            )}
          </Box>
        </Box>

        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          {editing ? (
            <Button variant="contained" color="primary" onClick={handleSave}>
              Guardar
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={() => setEditing(true)}>
              Editar
            </Button>
          )}
          <Button variant="contained" color="secondary" onClick={onBack}>
            Volver
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MaterialUIProfile;
