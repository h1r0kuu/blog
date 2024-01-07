import { AxiosResponse } from "axios"
import qs from 'qs';
import { PostDto } from "../models/post/PostDto"
import { TagDto } from "../models/post/TagDto"
import { PostCreationRequest } from "../models/post/PostCreationRequest"
import api from "../http"
import {
  GET_ALL_POSTS_URL,
  GET_ALL_TAGS_URL,
  GET_POST_BY_ID,
  POST_CREATION_URL,
  POST_MARK_UPDATE,
  POST_DELETE_URL,
  POST_UPDATE_URL,
  FIND_BY_USER_USERNAME, FIND_BY_PARAMS, USER_FEED,
} from "../constants/apiConstants"
import { MarkUpdateRequest } from "../models/post/MarkUpdateRequest"
import { MarkUpdateResponse } from "../models/post/MarkUpdateResponse"
import PostUpdatePage from "../pages/PostUpdatePage/PostUpdatePage"
import { PostUpdateRequest } from "../models/post/PostUpdateRequest"
import {array} from "yup";

export default class PostService {
  static async getAllPosts(page: number, pageSize: number): Promise<AxiosResponse<{content: PostDto[]}>> {
    const response = await api.get<{content: PostDto[]}>(GET_ALL_POSTS_URL, {
      params: {
        page: page,
        size: pageSize
      },
      paramsSerializer: params => qs.stringify(params)
    });
    return response;
  }
  static async getPostById(id: number): Promise<AxiosResponse<PostDto>> {
    const response = await api.get<PostDto>(GET_POST_BY_ID(id))
    if (response.status === 404) {
      throw new Error("Post not found")
    }
    return response
  }

  static async getAllTags(): Promise<AxiosResponse<TagDto[]>> {
    return await api.get<TagDto[]>(GET_ALL_TAGS_URL)
  }

  static async create(data: PostCreationRequest): Promise<AxiosResponse<number>> {
    return await api.post<any>(POST_CREATION_URL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  static async delete(id: number): Promise<AxiosResponse<void>> {
    return await api.delete(POST_DELETE_URL(id))
  }

  static async update(id: number, data: PostUpdateRequest): Promise<AxiosResponse<void>> {
    return await api.put<any>(POST_UPDATE_URL(id), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  static async updateMark(markUpdateRequest: MarkUpdateRequest): Promise<AxiosResponse<MarkUpdateResponse>> {
    return await api.post<any>(POST_MARK_UPDATE, markUpdateRequest)
  }

  static async findByUserUsername(username: string): Promise<AxiosResponse<PostDto[]>> {
    return await api.get<PostDto[]>(FIND_BY_USER_USERNAME(username))
  }

  static async findByQuery(query: string): Promise<AxiosResponse<PostDto[]>> {
    return await api.get<PostDto[]>(FIND_BY_PARAMS, {
      params: {
        q: query
      }
    });
  }

  static async findByTags(tags: String[]): Promise<AxiosResponse<PostDto[]>> {
    return await api.get<PostDto[]>(FIND_BY_PARAMS, {
      params: {
        tags: tags
      },
      paramsSerializer: params => qs.stringify(params, {arrayFormat: 'repeat'})
    });
  }

  static async getUserFeed(): Promise<AxiosResponse<PostDto[]>> {
    return await api.get<PostDto[]>(USER_FEED)
  }

}
