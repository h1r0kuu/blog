export const HOST = "http://localhost:8080"

export const API_URL = HOST + "/api/v1"

export const AUTH_URL = API_URL + "/auth"
export const LOGIN_API_URL = AUTH_URL + "/login"
export const REFRESH_API_URL = AUTH_URL + "/refresh"
export const FORGET_PASSWORD_API_URL = LOGIN_API_URL + "/forget"
export const REGISTRATION_API_URL = AUTH_URL + "/registration"
export const LOGOUT_API_URL = AUTH_URL + "/logout"
export const TOKEN_API_URL = REGISTRATION_API_URL + "/token"
export const RESEND_VERIFICATION_TOKEN = TOKEN_API_URL + "/resend"

export const USER_URL = API_URL + "/users"
export const GET_USER_BY_USERNAME = (username: string) => `${USER_URL}/${username}`
export const FOLLOW_USER = (username: string) => `${USER_URL}/${username}/follow`
export const UNFOLLOW_USER = (username: string) => `${USER_URL}/${username}/unfollow`
export const GET_USER_FOLLOWERS = (username: string) => `${USER_URL}/${username}/followers`
export const GET_USER_FOLLOWINGS = (username: string) => `${USER_URL}/${username}/followings`

export const VERIFY_TOKEN = (token: string) => `${TOKEN_API_URL}/${token}`

export const POST_URL = API_URL + "/posts"
export const GET_ALL_POSTS_URL = POST_URL + "/"
export const GET_POST_BY_ID = (id: number) => `${POST_URL}/${id}`
export const POST_CREATION_URL = POST_URL + "/create"
export const POST_DELETE_URL = (id: number) => `${POST_URL}/${id}/delete`
export const POST_UPDATE_URL = (id: number) => `${POST_URL}/${id}/update`
export const POST_MARK_UPDATE = POST_URL + "/mark/update"
export const FIND_BY_USER_USERNAME = (username: string) => `${POST_URL}/user/${username}`
export const FIND_BY_PARAMS = `${POST_URL}/search`
export const USER_FEED = POST_URL + "/feed"

export const TAG_URL = API_URL + "/tags"
export const GET_ALL_TAGS_URL = TAG_URL + "/"

export const SETTINGS_URL = USER_URL + "/settings"
export const CHANGE_PASSWORD = SETTINGS_URL + "/password"
export const CHANGE_GENERAL = SETTINGS_URL + "/general"
