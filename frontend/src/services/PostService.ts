import { AxiosResponse } from "axios"
import { PostDto } from "../models/post/PostDto"
import api from "../http"
import { GET_ALL_POSTS_URL, GET_POST_BY_ID } from "../constants/apiConstants"

export default class PostService {
    static async getAllPosts(): Promise<AxiosResponse<PostDto[]>> {
         return await api.get<PostDto[]>(GET_ALL_POSTS_URL)
     }
     static async getPostById(id: number): Promise<AxiosResponse<PostDto>> {
        const response = await api.get<PostDto>(GET_POST_BY_ID(id))
        if (response.status === 404) {
          throw new Error('Post not found')
        }
        return response
    }
 }