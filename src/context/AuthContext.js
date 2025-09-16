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
}
