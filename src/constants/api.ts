export const API_URL = import.meta.env.VITE_API_URL;

export const ApiRoutes = {
    auth: {
        x: {
            create_url: `${API_URL}/auth/x/login/url`,
            access_token: `${API_URL}/auth/x/login/access_token`,
        }
    }
}