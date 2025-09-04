export interface PostType{
    author: string
    description: string
    postDate: string
    likesCount: number
}

export interface ProfileType {
    id?: string
    name: string
    username: string
    mail: string
    img?: string
    created_at?: string
}

export interface UserSignIn {
    email: string
    password: string
}