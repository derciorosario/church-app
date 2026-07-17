import axios from "axios";
export const env = "pro";
import { Capacitor, CapacitorHttp } from '@capacitor/core';
export const isNative = Capacitor.isNativePlatform();
export const API_URL = 
 env == "dev" ? isNative ? "http://192.168.18.3:5001/api" : "http://localhost:5001/api" :
  // env == "dev" ? true ? "https://judelivery-api.derflash.com/api" : "http://localhost:5001/api" :
   env == "test" ? "https://judelivery-api.derflash.com/api" :
                  "https://judelivery-api.derflash.com/api";

const client = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

const uploadClient = axios.create({
  baseURL: API_URL,
});

// TOKEN HELPERS
export function getStoredToken() {
  return (
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token") ||
    null
  );
}

export function getStoredRefreshToken() {
  return localStorage.getItem("refresh_token") || null;
}

export function setStoredToken(token) {
  if (!token) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    delete client.defaults.headers.common.Authorization;
    return;
  }
  localStorage.setItem("accessToken", token);
  localStorage.setItem("token", token);
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function setStoredRefreshToken(token) {
  if (!token) {
    localStorage.removeItem("refresh_token");
    return;
  }
  localStorage.setItem("refresh_token", token);
}

const bootToken = getStoredToken();
if (bootToken) {
  client.defaults.headers.common.Authorization = `Bearer ${bootToken}`;
}

// Queue for requests that need to wait for token refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// AXIOS INTERCEPTORS - Request
client.interceptors.request.use((config) => {
  const t = getStoredToken();
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

uploadClient.interceptors.request.use((config) => {
  const t = getStoredToken();
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

// AXIOS INTERCEPTORS - Response with automatic token refresh
client.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    
    // If 401 and not already retried
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = getStoredRefreshToken();
      
      // No refresh token available, trigger logout
      if (!refreshToken) {
        setStoredToken(null);
        setStoredRefreshToken(null);
        window.dispatchEvent(new Event("auth:unauthorized"));
        return Promise.reject(err);
      }
      
      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return client(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }
      
      // Start refresh process
      isRefreshing = true;
      
      try {
        const response = await axios.post(`${API_URL}/auth/refresh-token`, {
          refreshToken
        });
        
        const { accessToken } = response.data;
        
        // Update stored tokens
        setStoredToken(accessToken);
        
        // Update Authorization header for current request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        
        // Process queued requests
        processQueue(null, accessToken);
        
        // Retry original request
        return client(originalRequest);
      } catch (refreshError) {
        // Refresh failed, process queue with error
        processQueue(refreshError, null);
        
        // Clear tokens and trigger logout
        setStoredToken(null);
        setStoredRefreshToken(null);
        window.dispatchEvent(new Event("auth: unauthorized"));
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    // Handle 401 for other cases (no refresh token, invalid, etc.)
    if (err.response?.status === 401) {
      setStoredToken(null);
      setStoredRefreshToken(null);
      window.dispatchEvent(new Event("auth:unauthorized"));
    }
    
    return Promise.reject(err);
  }
);

uploadClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      setStoredToken(null);
      setStoredRefreshToken(null);
      window.dispatchEvent(new Event("auth:unauthorized"));
    }
    return Promise.reject(err);
  }
);

// ---- Capacitor Native Bridge ---- //
async function nativeRequest(method, url, data = null, headers = {}) {
  const response = await CapacitorHttp.request({
    url,
    method,
    headers,
    data,
  });

  return {
    status: response.status,
    data: response.data,
    headers: response.headers,
  };
}

if (isNative) {
  client.request = async function (config) {
    const token = getStoredToken();
    const headers = {
      ...(config.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    return nativeRequest(
      config.method.toUpperCase(),
      API_URL + config.url,
      config.data,
      headers
    );
  };

  uploadClient.request = async function (config) {

    const token = getStoredToken();
    const headers = {
      ...(config.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    return nativeRequest(
      config.method.toUpperCase(),
      API_URL + config.url,
      config.data,
      headers
    ); 

  };


}

export { uploadClient };
export default client;

// ==================== API ====================

// ==================== ADMIN API ====================

// Get admin dashboard
export const getAdminDashboard = () => client.get('/profile/admin/dashboard');

