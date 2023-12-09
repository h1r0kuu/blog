export type UserResponse = {
  id: number
  username: string
  email: string
  about: string
  avatar: string
  cover: string
  isEmailVerified: boolean
  followersSize: number
  followingsSize: number
  isMyProfileSubscribed: boolean
  createdAt: Date
  updatedAt: Date
}

export type UserProfileResponse = {
  username: string
  about: string
  avatar: string
  cover: string
  followersSize: number
  followingsSize: number
  isMyProfileSubscribed: boolean
}

export type FollowResponse = {
  username: string
  avatar: string
  isMyProfileSubscribed: boolean
}
