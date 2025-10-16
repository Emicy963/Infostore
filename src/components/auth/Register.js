import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";

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
    const { darkMode } = useTheme();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
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
        <div className={`pt-16 pb-12 min-h-screen flex items-center justify-center ${
            darkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
            <div className={`max-w-2xl w-full rounded-lg shadow-lg p-8 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-gradient-to-r from-primary to-blue-600 p-4 rounded-full">
                            <FaUserPlus className="text-white text-4xl" />
                        </div>
                    </div>
                    <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Registro
                    </h1>
                    <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Crie sua conta Infostore
                    </p>
                </div>

                {(error || formError) && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 animate-fade-in-down">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {error || formError}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label 
                                htmlFor="username" 
                                className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                Username *
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 rounded-lg transition-all ${
                                    darkMode 
                                        ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-primary' 
                                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary'
                                } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                                placeholder="Seu username"
                            />
                        </div>

                        <div>
                            <label 
                                htmlFor="email" 
                                className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 rounded-lg transition-all ${
                                    darkMode 
                                        ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-primary' 
                                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary'
                                } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                                placeholder="seu@email.com"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label 
                                htmlFor="first_name" 
                                className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                Nome
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 rounded-lg transition-all ${
                                    darkMode 
                                        ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-primary' 
                                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary'
                                } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                                placeholder="Seu nome"
                            />
                        </div>

                        <div>
                            <label 
                                htmlFor="last_name" 
                                className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                Sobrenome
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 rounded-lg transition-all ${
                                    darkMode 
                                        ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-primary' 
                                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary'
                                } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                                placeholder="Seu sobrenome"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label 
                                htmlFor="password" 
                                className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                Senha *
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg transition-all ${
                                        darkMode 
                                            ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-primary' 
                                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary'
                                    } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                                        darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label 
                                htmlFor="confirm_password" 
                                className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                Confirmar Senha *
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirm_password"
                                    name="confirm_password"
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg transition-all ${
                                        darkMode 
                                            ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-primary' 
                                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary'
                                    } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                                        darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label 
                                htmlFor="phone_number" 
                                className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                Telefone
                            </label>
                            <input
                                type="text"
                                id="phone_number"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 rounded-lg transition-all ${
                                    darkMode 
                                        ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-primary' 
                                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary'
                                } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                                placeholder="+244 900 000 000"
                            />
                        </div>

                        <div>
                            <label 
                                htmlFor="bi" 
                                className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                BI/Passaporte
                            </label>
                            <input
                                type="text"
                                id="bi"
                                name="bi"
                                value={formData.bi}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 rounded-lg transition-all ${
                                    darkMode 
                                        ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-primary' 
                                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary'
                                } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                                placeholder="000000000XX00"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Registrando...
                            </span>
                        ) : 'Registrar'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        Já tem uma conta?{' '}
                        <Link to="/login" className="text-primary hover:text-primary-dark font-semibold">
                            Faça login
                        </Link>
                    </p>
                </div>

                <div className={`mt-6 pt-6 border-t text-center ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <Link to="/" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`}>
                        ← Voltar para página inicial
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;