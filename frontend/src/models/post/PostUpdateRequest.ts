export type PostUpdateRequest = {
    [key: string]: any;
    title: string
    body: string
    description: string
    tagIds: number[]
    poster?: FileList | null
}