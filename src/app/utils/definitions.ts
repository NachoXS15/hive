export interface PostType{
    author: string
    description: string
    postDate: string
    likesCount: number
}

export interface UserPublicInfo{
    user_id?: string
    created_at?: string
    job_avaliable: string
    student_status: string
    university: string
    degree: string
    desc: string
    province: string
    birthday: string
}

export interface ProfileType {
    id?: string
    name?: string | null
    username?: string | null
    mail?: string | null
    img?: string
    created_at?: string
    user_public_info: UserPublicInfo | undefined | null
}

export interface UserSignIn {
    email: string
    password: string
}