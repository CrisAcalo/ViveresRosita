import axios from "axios";
import { config } from "../../config/config";

// const API_BASE_URL = "http://localhost:3000/api/v1";
const API_BASE_URL = config.domain + "/api/v1";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("jsonWebToken"));
    if (token) {
        config.headers['auth-token'] = token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
