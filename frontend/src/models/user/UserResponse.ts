export type UserResponse = {
  id: number
  username: string
  password: string
  email: string
  avatar: string
  postsCount: number
  viewedPostsCount: number
  isEmailVerified: boolean
  followersSize: number
  followingsSize: number
  isMyProfileSubscribed: boolean
  createdAt: Date
  updatedAt: Date
}
