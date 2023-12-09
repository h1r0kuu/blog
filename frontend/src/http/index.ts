import axios from "axios"
import { HOST } from "../constants/apiConstants"

const api = axios.create({
  baseURL: HOST,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token !== null) config.headers.Authorization = `Bearer ${token || ""}`
  return config
})

api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const request = error.config
    if (error.response.status == 401) {
      localStorage.clear()
    }
  },
)

export default api
