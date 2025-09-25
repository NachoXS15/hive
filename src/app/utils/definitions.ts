type MinimalProfilePost = Pick<ProfileType, 'name'>;
// type MinimalProfileLink = Pick<ProfileType, 'name'>;

export interface PostType{
    id: string
    user_id: string
    body: string
    created_at: string
    likes: number
    profiles: MinimalProfilePost
}

export interface LinksProfileType {
    id: string
    user_id: string
    facebook?: string
    instagram?: string
    twitter?: string
    portfolio?: string
    linkedin?: string
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

export interface SimpleUserType {
    id?: string
    name?: string | null
    username?: string | null
    mail?: string | null
    img?: string
    created_at?: string
}

export interface UserSignIn {
    email: string
    password: string
}