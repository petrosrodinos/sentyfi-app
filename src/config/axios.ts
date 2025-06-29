import axios from 'axios'
import { API_URL } from '@/constants/api'
import { getAuthStoreState } from '@/stores/auth'

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthStoreState().access_token}`
    },
})


export default axiosInstance 