import React, { createContext, useEffect ,useState, useContext, } from "react";
import api from "../services/api";

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

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userEmail");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
