//profiles
export interface ProfileType {
    id?: string
    name?: string | null
    username?: string | null
    mail?: string | null
    img?: string
    role?: string | null
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
    role?: string | null

}

type MinimalProfilePost = Pick<ProfileType, 'name' | 'profile_img_color' | 'id'>;

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

//Post

export interface PostType{
    id: string
    user_id: string
    body: string
    created_at: string
    likes?: number | null // columna vieja de posts, sin uso: el conteo sale de post_likes
    profiles: MinimalProfilePost
    likes_count: number
    comments_count: number
}

//Comentarios

export const COMMENT_MAX_LENGTH = 1000

export interface CommentType {
    id: string
    post_id: string
    user_id: string
    body: string
    created_at: string
    profiles: MinimalProfilePost | null
}

//Notificaciones

export type NotificationKind = "like" | "comment"

export interface NotificationType {
    id: string
    kind: NotificationKind
    post_id: string
    created_at: string
    read_at: string | null
    actor: MinimalProfilePost | null // quién dio me gusta o comentó
    post_excerpt: string | null // comienzo del texto del post
    comment_excerpt: string | null // comienzo del comentario (solo si kind = "comment")
}

export interface NotificationsData {
    notifications: NotificationType[] // las más recientes
    unreadCount: number // total sin leer (puede ser más que las que vienen en la lista)
}

//sign in info
export interface UserSignIn {
    email: string
    password: string
}

//docs
export interface DocType {
    id: string
    user_id?: string
    post_id?: string
    title?: string
    author?: string
    release_year?: string
    file_path: string
    dept?: string
    degree?: string
    category?: string
    theme?: string
}

//register info

export interface PostFormData {
  body: string;
  fileActive?: boolean;
  title?: string;
  author?: string | null;
  release_year?: string;
  degree?: string;
  file: File | null
  fileName: string
  dept?: string
  category: string
  theme: string
}