import { TagDto } from "./TagDto"

export type PostCreationRequest = {
    [key: string]: any;
    title: string
    body: string
    description: string
    tags: TagDto[]
    creatorUsername: string
    poster?: File
}
