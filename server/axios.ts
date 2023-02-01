import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000/api"
})

api.interceptors.response.use(
    (response) => {
            const res = response?.data || response

            return res;
    },
    async (error) => {
        console.log('api_error :>>>', error.response.data)
        return error.response.data
    }
)

export default api;