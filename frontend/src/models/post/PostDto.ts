import { CategoryDto } from "./CategoryDto"
import { TagDto } from "./TagDto"
import { UserDisplayInfo } from "../user/UserDisplayInfo"

export type PostDto = {
     id: number
     title: string
     posterUrl: string
     body: string
     category: CategoryDto
     tags: TagDto[]
     creator: UserDisplayInfo
     views: number
     mark: number
     positiveMarks: number
     negativeMarks: number
     createdAt: string
}
