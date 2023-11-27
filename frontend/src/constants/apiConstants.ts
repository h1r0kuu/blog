export const HOST = "http://localhost:8080"

export const API_URL = HOST + "/api/v1"

export const AUTH_URL = API_URL + "/auth"
export const LOGIN_API_URL = AUTH_URL + "/login"
export const REGISTRATION_API_URL = AUTH_URL + "/registration"
export const LOGOUT_API_URL = AUTH_URL + "/logout"

export const USER_URL = API_URL + "/users"
export const GET_USER_BY_USERNAME = (username: string) => `${USER_URL}/${username}`