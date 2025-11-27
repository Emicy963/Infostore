import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1',
    timeout: 10000, // 10 segundos de timeout
    headers: {
        'Content-Type': 'application/json',
    }
});

// Cache simples para requisições GET
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Interceptor para adicionar o token JWT em todas as requisições
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Adicionar timestamp para cache
        if (config.method === 'get') {
            const cacheKey = `${config.url}${JSON.stringify(config.params)}`;
            const cached = cache.get(cacheKey);
            
            if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
                // Cancelar requisição e retornar dados do cache
                config.adapter = () => {
                    return Promise.resolve({
                        data: cached.data,
                        status: 200,
                        statusText: 'OK (cached)',
                        headers: {},
                        config
                    });
                };
            }
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Interceptor para lidar com respostas e cache
api.interceptors.response.use(
    response => {
        // Cachear respostas GET bem-sucedidas
        if (response.config.method === 'get' && response.status === 200) {
            const cacheKey = `${response.config.url}${JSON.stringify(response.config.params)}`;
            cache.set(cacheKey, {
                data: response.data,
                timestamp: Date.now()
            });
        }

        // INVALIDAÇÃO AUTOMÁTICA: Limpar cache após mutações bem-sucedidas
        // Isso garante que requisições GET subsequentes busquem dados frescos do servidor
        if (['post', 'put', 'patch', 'delete'].includes(response.config.method) && 
            response.status >= 200 && response.status < 300) {
            
            // Extrair a URL base (sem query params)
            const urlBase = response.config.url.split('?')[0];
            
            // Invalidar cache da URL específica
            invalidateCacheByUrl(urlBase);
            
            // Invalidar cache de URLs pai/relacionadas
            // Ex: POST /cart/add/ invalida tanto /cart/add/ quanto /cart/
            const segments = urlBase.split('/').filter(Boolean);
            if (segments.length > 1) {
                // Invalidar URL pai (um nível acima)
                const parentUrl = '/' + segments.slice(0, -1).join('/') + '/';
                invalidateCacheByUrl(parentUrl);
            }
            
            // Para endpoints de autorização, invalidar o cache de perfil também
            if (urlBase.includes('/auth/')) {
                invalidateCacheByUrl('/auth/profile/');
            }
        }

        return response;
    },
    async error => {
        const originalRequest = error.config;
        
        // Se o erro for 401 e ainda não tentamos renovar o token
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    const response = await axios.post(
                        `${process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1'}/auth/token/refresh/`, 
                        { refresh: refreshToken }
                    );
                    
                    const { access } = response.data;
                    localStorage.setItem('accessToken', access);
                    
                    // Atualiza o header da requisição original com o novo token
                    originalRequest.headers.Authorization = `Bearer ${access}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // Se não conseguir renovar o token, desloga o usuário
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        
        // Tratamento de erros de rede
        if (!error.response) {
            console.error('Erro de rede:', error.message);
            return Promise.reject({
                message: 'Erro de conexão. Verifique sua internet.',
                type: 'network'
            });
        }

        return Promise.reject(error);
    }
);

// Função para limpar cache manualmente
export const clearCache = () => {
    cache.clear();
};

// Função para invalidar cache específico
export const invalidateCacheByUrl = (url) => {
    for (const key of cache.keys()) {
        if (key.startsWith(url)) {
            cache.delete(key);
        }
    }
};

export default api;