import { TagDto } from "./TagDto"
import { FollowResponse } from "../user/UserResponse"

export type PostDto = {
     id: number
     title: string
     posterUrl: string
     description: string
     body: string
     tags: TagDto[]
     creator: FollowResponse
     views: number
     mark: number
     positiveMarks: number
     negativeMarks: number
     markStatus: boolean | null
     isMyProfileSubscribed: boolean | null
     createdAt: string
}
