import axios from "axios";
import { User } from "../models/user";
import { store } from "../store/store";
import { setUser } from "../store/userSlice";
// Clase que hace los llamados al backend para loggearse
class SecurityService extends EventTarget {
    keySession: string;
    API_URL: string;
    user: User;
    theAuthProvider: any;
    
    constructor() {
        super();

        this.keySession = 'token';
        this.API_URL = "http://127.0.0.1:5000/api/";
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            this.user = JSON.parse(storedUser);
        } else {
            this.user = {};
        }
    }

    async login(user: User) {
        console.log("llamando api " + `${this.API_URL}/login`); // Hacemos el llamado al backend para loggearse
        try {
            const response = await axios.post(`${this.API_URL}/login`, user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data; // Viene el usuario y el token
            //localStorage.setItem("user", JSON.stringify(data));
            store.dispatch(setUser(data["user"]));
            localStorage.setItem(this.keySession, data["token"]);
            return data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }
    
    getUser() {
        return this.user;
    }
    
    logout() {
        this.user = {};
        
        this.dispatchEvent(new CustomEvent("userChange", { detail: null }));
        store.dispatch(setUser(null));
    }

    isAuthenticated() {
        return localStorage.getItem(this.keySession) !== null;
    }

    getToken() {
        return localStorage.getItem(this.keySession);
    }
}

export default new SecurityService();
