import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState("");
    const { login, error, loading } = useAuth();
    const { darkMode } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setFormError("Por favor, preencha todos os campos");
            return;
        }

        const result = await login(username, password);

        if (result.success) {
            navigate(from, { replace: true });
        }
    };

    return (
        <div className={`pt-16 pb-12 min-h-screen flex items-center justify-center ${
            darkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
            <div className={`max-w-md w-full rounded-lg shadow-lg p-8 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-gradient-to-r from-primary to-blue-600 p-4 rounded-full">
                            <FaUserCircle className="text-white text-4xl" />
                        </div>
                    </div>
                    <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Login
                    </h1>
                    <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Entre na sua conta Infostore
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
                    <div className="mb-4">
                        <label 
                            htmlFor="username" 
                            className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                            Email ou Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`w-full px-4 py-2 rounded-lg transition-all ${
                                darkMode 
                                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-primary' 
                                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary'
                            } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                            placeholder="seu@email.com ou username"
                        />
                    </div>

                    <div className="mb-6">
                        <label 
                            htmlFor="password" 
                            className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                            Senha
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                Entrando...
                            </span>
                        ) : "Entrar"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        Não tem uma conta?{" "}
                        <Link to="/register" className="text-primary hover:text-primary-dark font-semibold">
                            Registre-se
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

export default Login;