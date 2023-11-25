import axios, {AxiosResponse} from "axios";
import {LOGIN_API_URL, REGISTRATION_API_URL} from "../constants/apiConstants";
import api from "../http";
import {AuthResponse} from "../models/auth/AuthRespose";
import {AuthRequest} from "../models/auth/AuthRequest";
import {RegistrationRequest} from "../models/registration/RegistrationRequest";

export default class AuthService {
    static async login(data: AuthRequest): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>(LOGIN_API_URL, data)
    }

    static async register(data: RegistrationRequest): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>(LOGIN_API_URL, data)
    }

    // static async logout(): Promise<void> {
    //     api.post()
    // }
}