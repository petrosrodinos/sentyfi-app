import axios from 'axios'
import { API_URL } from '@/config/api/routes'
import { getAuthStoreState } from '@/stores/auth'

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const authState = getAuthStoreState();
    if (authState.access_token) {
        config.headers.Authorization = `Bearer ${authState.access_token}`;
    }
    return config;
});

export default axiosInstance 