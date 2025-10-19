type MinimalProfilePost = Pick<ProfileType, 'name' | 'profile_img_color'>;
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
    portfolio_cv?: string
    linkedin?: string
}

export interface UserPublicInfo{
    user_id?: string
    created_at?: string
    job_avaliable?: string
    student_status?: string
    dept?: string
    degree?: string
    desc?: string
    province?: string
    birthday?: string
}

export interface ProfileType {
    id?: string
    name?: string | null
    username?: string | null
    mail?: string | null
    img?: string
    created_at?: string
    profile_img_color?: string
    user_public_info?: UserPublicInfo | undefined | null
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

export interface DocType {
    id: string
    user_id?: string
    post_id?: string
    title?: string
    author?: string
    release_year?: string
    file_path: string
}

export interface PostFormData {
  body: string;
  fileActive?: boolean;
  title?: string;
  author?: string | null;
  release_year?: string;
  degree?: string;
  file: File | null
  fileName: string
}