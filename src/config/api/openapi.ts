import OpenAPIClientAxios from 'openapi-client-axios';
import { API_URL } from '@/config/api/routes';

export const openapi_client = new OpenAPIClientAxios({
    definition: `${API_URL}/api-json`,
    axiosConfigDefaults: {
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    },
});

export const api_client = openapi_client.getClient();

// Initialize the client and handle any errors
export const initializeApiClient = async () => {
    try {
        await openapi_client.init();
        console.log('OpenAPI client initialized successfully');
        return api_client;
    } catch (error) {
        console.error('Failed to initialize OpenAPI client:', error);
        throw error;
    }
}; 