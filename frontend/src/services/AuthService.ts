import { AxiosResponse } from "axios"
import {
  LOGIN_API_URL,
  LOGOUT_API_URL,
  REGISTRATION_API_URL,
  RESEND_VERIFICATION_TOKEN,
} from "../constants/apiConstants"
import api from "../http"
import { AuthResponse } from "../models/auth/AuthRespose"
import { AuthRequest } from "../models/auth/AuthRequest"
import { RegistrationRequest } from "../models/registration/RegistrationRequest"

export default class AuthService {
  static async login(data: AuthRequest): Promise<AxiosResponse<AuthResponse>> {
    return await api.post<AuthResponse>(LOGIN_API_URL, data)
  }

  static async register(data: RegistrationRequest): Promise<AxiosResponse<AuthResponse>> {
    return await api.post<AuthResponse>(REGISTRATION_API_URL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  static async logout(): Promise<void> {
    return await api.post(LOGOUT_API_URL)
  }

  static async resendActivationCode(): Promise<void> {
    await api.post(RESEND_VERIFICATION_TOKEN)
  }
}
