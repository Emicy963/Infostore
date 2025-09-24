import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState("");
    const { login, error, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // If user go redirect to login, save the URl
    const from = location.state?.from?.pathname || "/";
};