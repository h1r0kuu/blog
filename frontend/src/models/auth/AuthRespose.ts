import {UserResponse} from "../user/UserResponse";

export type AuthResponse = {
    jwt: string;
    user: UserResponse;
}