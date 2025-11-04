import axios from "axios";
import { Profile } from "../models/profile";

const API = import.meta.env.VITE_API_URL;

export const profileService = {
  getProfileByUserId: async (userId: number): Promise<Profile | null> => {
    try {
      const res = await axios.get(`${API}/profiles/user/${userId}`);
      return res.data || null;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  },

  createProfile: async (
    userId: number,
    phone: string,
    photo?: File
  ): Promise<Profile> => {
    const formData = new FormData();
    formData.append("phone", phone);
    if (photo) formData.append("photo", photo);

    const res = await axios.post(`${API}/profiles/user/${userId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  updateProfile: async (
    profileId: number,
    phone: string,
    photo?: File
  ): Promise<Profile> => {
    const formData = new FormData();
    formData.append("phone", phone);
    if (photo) formData.append("photo", photo);

    const res = await axios.put(`${API}/profiles/${profileId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
};
