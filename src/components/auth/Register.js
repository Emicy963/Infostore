import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formError, setFormError] = useState("");
    const { register, error, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!name || !email || !password || !confirmPassword) {
            setFormError("Por favor, preencha todos os campos.");
            return;
        }

        if (password !== confirmPassword) {
            setFormError("As senhas não coincidém.");
            return;
        }

        if (password.length < 6) {
            setFormError("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        const result = await register(email, password, name);

        if (result.sucess) {
            navigate("/login", {
                state: { message: "Registro realizado com sucesso! Faça login para continuar." }
            });
        }
    };
};

export default Register;