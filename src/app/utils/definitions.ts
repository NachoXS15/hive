export interface PostType{
    author: string
    description: string
    postDate: string
    likesCount: number
}

export interface UserPublicInfo{
    jobAvaliable: string
    student_status: string
    university: string
    degree: string
    desc: string
    province: string
    birthday: string
}

export interface ProfileType {
    id?: string
    name: string
    username: string
    mail: string
    img?: string
    created_at?: string
    user_info: UserPublicInfo | null
}

export interface UserSignIn {
    email: string
    password: string
}