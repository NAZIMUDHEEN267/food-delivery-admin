import axios from "axios";

const customAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 100000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
})


customAxios.interceptors.response.use(
    response => response.data,
    err => Promise.reject(err?.response?.data?.message || err?.response?.data)
)


export default customAxios;