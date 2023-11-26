import axios from "axios";
import {HOST} from "../constants/apiConstants";

const api = axios.create({
    baseURL: HOST
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    if(token !== null)
        config.headers.Authorization = `Bearer ${token || ""}`
    return config
})

export default api;