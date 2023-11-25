import axios from "axios";
import {HOST} from "../constants/apiConstants";

const api = axios.create({
    baseURL: HOST
})

api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token") || ""}`
    return config
})

export default api;