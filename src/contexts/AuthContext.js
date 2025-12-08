import React, { createContext, useState, useContext, useEffect } from 'react';
import api, { clearCache } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
        // Verificar se o token é válido obtendo os dados do usuário
        const fetchUser = async () => {
            try {
            const response = await api.get('/auth/profile/');
            setUser(response.data);
            } catch (err) {
            console.error('Error fetching user:', err);
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

    const login = async (username, password) => {
        try {
        setError(null);
        const response = await api.post('/auth/token/', { 
            username, 
            password 
        });
        const { access, refresh, user } = response.data;
        
        // Salvar tokens no localStorage
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        
        setUser(user);
        return { success: true };
        } catch (err) {
        let errorMessage = 'Login failed';
        
        // Tratamento detalhado de erros
        if (err.response) {
            // O servidor respondeu com um status de erro
            if (err.response.status === 401) {
            errorMessage = 'Email ou senha incorretos';
            } else if (err.response.data && err.response.data.detail) {
            errorMessage = err.response.data.detail;
            } else if (err.response.data && err.response.data.error) {
            errorMessage = err.response.data.error;
            }
        } else if (err.request) {
            // A requisição foi feita mas não houve resposta
            errorMessage = 'Sem resposta do servidor. Verifique sua conexão.';
        } else {
            // Algum outro erro ocorreu
            errorMessage = err.message;
        }
        
        setError(errorMessage);
        return { success: false, error: errorMessage };
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try {
            const cleanData = Object.fromEntries(
                Object.entries(userData).filter(([_, value]) => value !== '' && value !== null)
            );
            
            const response = await api.post('/auth/register/', cleanData);
            setLoading(false);
            return { success: true };
        } catch (err) {
            setLoading(false);
            
            // Extrair mensagens de erro específicas
            let errorMessage = 'Erro ao registrar. Tente novamente.';
            
            if (err.response?.data) {
                const errors = err.response.data;
                // Pegar a primeira mensagem de erro
                const firstError = Object.values(errors)[0];
                if (Array.isArray(firstError)) {
                    errorMessage = firstError[0];
                } else if (typeof firstError === 'string') {
                    errorMessage = firstError;
                }
            }
            
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const logout = async () => {
        try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            await api.post('/auth/logout/', { refresh: refreshToken });
        }
        } catch (err) {
        console.error('Error during logout:', err);
        } finally {
        // Limpar todo o cache ao fazer logout para evitar mostrar dados do usuário anterior
        clearCache();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ 
        user, 
        login, 
        register, 
        logout, 
        loading, 
        error 
        }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);