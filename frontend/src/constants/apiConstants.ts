export const HOST = "http://localhost:8080"

export const API_URL = HOST + "/api/v1"

export const AUTH_URL = API_URL + "/auth"
export const LOGIN_API_URL = AUTH_URL + "/login"
export const REGISTRATION_API_URL = AUTH_URL + "/registration"
export const LOGOUT_API_URL = AUTH_URL + "/logout"
export const RESEND_VERIFICATION_TOKEN = REGISTRATION_API_URL + "/token/resend"

export const USER_URL = API_URL + "/users"
export const GET_USER_BY_USERNAME = (username: string) => `${USER_URL}/${username}`
export const FOLLOW_USER = (username: string) => `${USER_URL}/${username}/follow`
export const UNFOLLOW_USER = (username: string) => `${USER_URL}/${username}/unfollow`
export const GET_USER_FOLLOWERS = (username: string) => `${USER_URL}/${username}/followers`
export const GET_USER_FOLLOWINGS = (username: string) => `${USER_URL}/${username}/followings`

export const SETTINGS_URL = USER_URL + "/settings"
export const CHANGE_PASSWORD = SETTINGS_URL + "/password"
