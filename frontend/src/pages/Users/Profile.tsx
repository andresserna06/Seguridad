import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";
import { profileService } from "../../services/profileService";
import { User } from "../../models/user";
import { Profile } from "../../models/profile";
import TailwindProfile from "../../components/common/TailWind/TailwindProfile";

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const userData = await userService.getUserById(Number(id));
        let profileData = await profileService.getProfileByUserId(Number(id));

        // Crear perfil si no existe
        if (!profileData && userData) {
          profileData = await profileService.createProfile(
            userData.id!, // user_id obligatorio
            "",           // phone vacío
            undefined    // photo vacío
          );
          console.log("Perfil creado automáticamente:", profileData);
        }

        setUser(userData);
        setProfile(profileData);
      } catch (error) {
        console.error("❌ Error cargando perfil:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!user || !profile) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="p-6">
      <TailwindProfile
        user={user}
        profile={profile}
        onBack={() => navigate(-1)}
        onProfileUpdated={(updatedProfile) => setProfile(updatedProfile)}
      />
    </div>
  );
};

export default ProfilePage;
