import {AxiosResponse} from "axios";
import {UserResponse} from "../models/user/UserResponse";
import api from "../http";
import {GET_USER_BY_USERNAME} from "../constants/apiConstants";

export default class UserService {
    static async getUserByUsername(username: string): Promise<AxiosResponse<UserResponse>> {
        return api.get<UserResponse>(GET_USER_BY_USERNAME(username))
    }
}