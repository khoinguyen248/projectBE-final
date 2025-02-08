import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
})

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token"); // Lưu token khi đăng nhập
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const signup = (data) => API.post('/account/signup', data)
export const signin = (data1 ) => API.post(`/account/signin`, data1)
export const getInfors = (email) => API.get(`/account/profile?email=${email}`)