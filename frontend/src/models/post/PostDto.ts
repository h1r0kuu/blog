import { TagDto } from "./TagDto"
import { FollowResponse } from "../user/UserResponse"

export type PostDto = {
     id: number
     title: string
     posterUrl: string
     body: string
     tags: TagDto[]
     creator: FollowResponse
     views: number
     mark: number
     positiveMarks: number
     negativeMarks: number
     createdAt: string
}
