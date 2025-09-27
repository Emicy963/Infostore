import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
});

// Interceptor para adicionar o token JWT em todas as requisições
api.interceptors.request.use(config => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor para lidar com tokens expirados
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        
        // Se o erro for 401 e ainda não tentamos renovar o token
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
            const response = await axios.post("http://localhost:8000/api/token/refresh/", {
                refresh: refreshToken
            });
            
            const { access } = response.data;
            localStorage.setItem("accessToken", access);
            
            // Atualiza o header da requisição original com o novo token
            originalRequest.headers.Authorization = `Bearer ${access}`;
            return api(originalRequest);
            }
        } catch (refreshError) {
            // Se não conseguir renovar o token, desloga o usuário
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
            return Promise.reject(refreshError);
        }
        }
        
        return Promise.reject(error);
    }
);

export default api;