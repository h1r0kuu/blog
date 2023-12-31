import { AxiosResponse } from "axios"
import { FollowResponse, UserProfileResponse, UserResponse } from "../models/user/UserResponse"
import api from "../http"
import {
  CHANGE_GENERAL,
  CHANGE_PASSWORD,
  FOLLOW_USER,
  GET_USER_BY_USERNAME,
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWINGS,
  UNFOLLOW_USER,
} from "../constants/apiConstants"
import { ChangePasswordFormProps } from "../models/forms/ChangePasswordForm"
import { PageableResponse } from "../models/pageable"
import { ChangeGeneralSettingsForm } from "../models/forms/ChangeGeneralSettingsForm"

export default class UserService {
  static async getUserByUsername(username: string): Promise<AxiosResponse<UserProfileResponse>> {
    return await api.get<UserProfileResponse>(GET_USER_BY_USERNAME(username))
  }

  static async changeUserPassword(data: ChangePasswordFormProps): Promise<AxiosResponse<string>> {
    return await api.put(CHANGE_PASSWORD, data)
  }

  static async changeGeneralSettings(data: ChangeGeneralSettingsForm): Promise<AxiosResponse<string>> {
    return await api.put(CHANGE_GENERAL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  static async getUserFollowers(username: string): Promise<AxiosResponse<PageableResponse<FollowResponse>>> {
    return await api.get<PageableResponse<FollowResponse>>(GET_USER_FOLLOWERS(username))
  }

  static async getUserFollowings(username: string): Promise<AxiosResponse<PageableResponse<FollowResponse>>> {
    return await api.get<PageableResponse<FollowResponse>>(GET_USER_FOLLOWINGS(username))
  }

  static async followUser(username: string): Promise<void> {
    await api.post(FOLLOW_USER(username))
  }

  static async unfollowUser(username: string): Promise<void> {
    await api.delete(UNFOLLOW_USER(username))
  }
}
