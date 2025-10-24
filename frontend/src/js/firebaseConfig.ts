import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlYbI58UJTMNcuW7lDmA4EQ7jwftfYWTc",
  authDomain: "proyecto-seguridad-2025-1d9dd.firebaseapp.com",
  projectId: "proyecto-seguridad-2025-1d9dd",
  storageBucket: "proyecto-seguridad-2025-1d9dd.firebasestorage.app",
  messagingSenderId: "535769506471",
  appId: "1:535769506471:web:638b6dd9aeb0ad1dfd3182",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
