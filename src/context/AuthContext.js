import React, { createContext, useState, useContext, Children, use } from "react";
import api from "../service/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Verify if user be authenticated in loading
    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Add the main logical for auth
            setUser({ email: localStorage.getItem("userEmail") });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            // Here is for request from login endpoint
            localStorage.setItem("token", "fake-token");
            localStorage.setItem("userEmail", email);
            setUser({ email });
            return { success: true };
        } catch (error) {
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
