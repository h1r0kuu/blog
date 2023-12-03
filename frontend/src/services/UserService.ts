import { AxiosResponse } from "axios"
import { UserResponse } from "../models/user/UserResponse"
import api from "../http"
import { CHANGE_PASSWORD, GET_USER_BY_USERNAME } from "../constants/apiConstants"
import { ChangePasswordFormProps } from "../models/forms/ChangePasswordForm"

export default class UserService {
  static async getUserByUsername(username: string): Promise<AxiosResponse<UserResponse>> {
    return api.get<UserResponse>(GET_USER_BY_USERNAME(username))
  }

  static async changeUserPassword(data: ChangePasswordFormProps): Promise<AxiosResponse<string>> {
    return api.put(CHANGE_PASSWORD, data)
  }
}
