import React, { createContext, useEffect ,useState, useContext, } from "react";
import api from "../services/api";
import { faL } from "@fortawesome/free-solid-svg-icons";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("acessToken");
        if (token) {
            // Verify if the token is valid get data from user
            const fetchUser = async () => {
                try {
                    const response = await api.get("/api/profile");
                    setUser(response.data);
                } catch (error) {
                    console.error("Error fetching user:", error);
                    logout();
                } finally {
                    setLoading(false);
                }
            };

            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        try {
            setError(null);
            const response = await api.post("/api/token/", {email, password });
            const { access, refresh, user } = response.data;

            // Save token in localStorage
            localStorage.setItem("acessToken", access);
            localStorage.setItem("refreshToken", refresh);

            setUser(user);
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.detail || "Login failed";
            setError(errorMessage);
            return { success: false, error: error.message };
        }
    };

    const register = async (email, password, name) => {
        try {
            setError(null);
            await api.post("/api/register/", { email, password, name });
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Registration failed";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const logout = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
                await api.post("/api/logout/", { refresh: refreshToken });
            }
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            localStorage.removeItem("acessToken");
            localStorage.removeItem("refreshToken");
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
