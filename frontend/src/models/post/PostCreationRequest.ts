export type PostCreationRequest = {
    [key: string]: any;
    title: string
    body: string
    description: string
    tagIds: number[]
    creatorUsername: string
    poster?: FileList
}
