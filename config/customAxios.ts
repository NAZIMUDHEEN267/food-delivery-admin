import axios from "axios";

const customAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json'
    }
})


customAxios.interceptors.request.use((config) => { 

    const token = typeof window !== undefined ? localStorage.getItem('token') : null;
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

customAxios.interceptors.response.use(response => response.data, err => {
    return Promise.reject(err?.response?.data)
})


export default customAxios;