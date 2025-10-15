import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        bi: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formError, setFormError] = useState("");
    const { register, error, loading } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validação básica
        if (!formData.username || !formData.email || !formData.password || !formData.confirm_password) {
            setFormError("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        if (formData.password !== formData.confirm_password) {
            setFormError("As senhas não coincidem.");
            return;
        }

        if (formData.password.length < 8) {
            setFormError("A senha deve ter pelo menos 8 caracteres.");
            return;
        }

        const result = await register(formData);

        if (result.success) {
            navigate("/login", {
                state: { message: "Registro realizado com sucesso! Faça login para continuar." }
            });
        }
    };

    return (
        <div className="pt-16 pb-12 bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Registro</h1>
                    <p className="text-gray-600 mt-2">Crie sua conta Infostore</p>
                </div>

                {(error || formError) && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                        {error || formError}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 mb-2">Username *</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Seu username"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-2">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="seu@email.com"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="first_name" className="block text-gray-700 mb-2">Nome</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Seu nome"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="last_name" className="block text-gray-700 mb-2">Sobrenome</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Seu sobrenome"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 mb-2">Senha *</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="confirm_password" className="block text-gray-700 mb-2">Confirmar Senha *</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirm_password"
                                name="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone_number" className="block text-gray-700 mb-2">Telefone</label>
                        <input
                            type="text"
                            id="phone_number"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Seu telefone"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="bi" className="block text-gray-700 mb-2">BI/Passaporte</label>
                        <input
                            type="text"
                            id="bi"
                            name="bi"
                            value={formData.bi}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Seu BI ou passaporte"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 disabled:opacity-50"
                    >
                        {loading ? 'Registrando...' : 'Registrar'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Já tem uma conta?{' '}
                        <Link to="/login" className="text-primary hover:text-primary-dark">
                            Faça login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;