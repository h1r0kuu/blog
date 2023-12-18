import {AxiosResponse} from "axios"
import {PostDto} from "../models/post/PostDto"
import {TagDto} from "../models/post/TagDto"
import {PostCreationRequest} from "../models/post/PostCreationRequest"
import api from "../http"
import {GET_ALL_POSTS_URL, GET_ALL_TAGS_URL, GET_POST_BY_ID, POST_CREATION_URL} from "../constants/apiConstants"


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

    static async getAllTags(): Promise<AxiosResponse<TagDto[]>> {
        return await api.get<TagDto[]>(GET_ALL_TAGS_URL)
    }

    static async create(data: PostCreationRequest): Promise<AxiosResponse<any>> {
        return await api.post<any>(POST_CREATION_URL, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
 }