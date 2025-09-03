export interface PostType{
    author: string
    description: string
    postDate: string
    likesCount: number
}

export interface ProfileType {
    id?: string
    name: string
    mail: string
    role: string
    status: string
    img?: string
    type: string
    created_at?: string
}

export interface UserSignIn {
    email: string
    password: string
}