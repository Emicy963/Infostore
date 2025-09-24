import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem("acessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor for take with expired tokens
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // If erro be 401 and yet don't have refresh token
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (refreshToken) {
                    const response = await axios.post("http://localhost:8000/api/token/refresh/", {
                        refresh: refreshToken
                    });

                    const { access } = response.data;
                    localStorage.setItem("acessToken", access);

                    // Update original request header with the new token
                    originalRequest.headers.Authorization = `Bearer ${access}`
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // If can't refresh token, logout the user
                localStorage.removeItem("acessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
