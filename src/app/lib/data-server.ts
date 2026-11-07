import { unstable_rethrow } from "next/navigation";
import { CommentType, DocType, LinksProfileType, NotificationKind, NotificationsData, NotificationType, PostType, ProfileType, SimpleUserType, UserPublicInfo } from "../utils/definitions";
import { createClient } from "../utils/supabase/server"

//traer info básica de todos los usuarios
export async function fetchUsers(){
    try {
        const supabase = await createClient();
        const {data, error} = await supabase.from("profiles").select(`
            *,
            user_public_info (
                *
            )`
        )
        if (error) {
            console.log(error.message);
        }
        return data as ProfileType[];
    } catch (error) {
        unstable_rethrow(error);
        console.error(error);
    }
}

//traer un solo usuario
export async function fetchUserById(id?: string){
    try {
        const supabase = await createClient();
        const {data, error} = await supabase.from("profiles").select("*").eq("id", id).maybeSingle()
        if (error) {
            console.log(error.message);
        }
        return data as SimpleUserType;
    } catch (error) {
        unstable_rethrow(error);
        console.error(error);
    }
}

// Columnas de un post para el feed: autor + cantidad de me gusta y comentarios.
// "!posts_user_id_fkey" fija la relación con profiles (el autor del post), por si
// en el futuro aparece otro camino posts <-> profiles y la API no sabe cuál usar.
const POST_SELECT = `
    *,
    profiles!posts_user_id_fkey (
        id,
        name,
        profile_img_color
    ),
    post_likes ( count ),
    post_comments ( count )
` as const;

type PostRow = Omit<PostType, "likes_count" | "comments_count"> & {
    post_likes?: { count: number }[] | null
    post_comments?: { count: number }[] | null
}

function toPost({ post_likes, post_comments, ...post }: PostRow): PostType {
    return {
        ...post,
        likes_count: post_likes?.[0]?.count ?? 0,
        comments_count: post_comments?.[0]?.count ?? 0,
    };
}

function toPosts(data: unknown): PostType[] {
    return ((data ?? []) as PostRow[]).map(toPost);
}

//traer todos los posts
export async function fetchPosts(){
    try {
        const supabase = await createClient();
        const {data, error} = await supabase.from("posts").select(POST_SELECT)
        .order("created_at", { ascending: false });
        if (error) {
            console.log(error.message);
        }
        return toPosts(data);
    } catch (error) {
        unstable_rethrow(error);
        console.log(error);
    }
}
export async function fetchDocs(){
    try {
        const supabase = await createClient();
        const {data, error} = await supabase.from("documents").select(`*`);
        if (error) {
            console.log(error.message);
        }
        return data as DocType[];
    } catch (error) {
        unstable_rethrow(error);
        console.log(error);
    }
}

//traer post por usuario
export async function fetchPostsById(id: string){
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
        .from("posts")
        .select(POST_SELECT)
        .eq("user_id", id)
        .order("created_at", { ascending: false });
        if (error) {
            console.log(error.message);
        }
        return toPosts(data);
    } catch (error) {
        unstable_rethrow(error);
        console.error(error);
    }
}

//traer un solo post
export async function fetchSinglePost(id: string){
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
        .from("posts")
        .select(POST_SELECT)
        .eq("id", id)
        .maybeSingle();
        if (error) {
            console.log(error.message);
        }
        return data ? toPost(data as PostRow) : null;
    } catch (error) {
        unstable_rethrow(error);
        console.error(error);
    }
}

//traer links de un usuario
export async function fetchLinksById(id: string){
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
        .from("user_links")
        .select(`*`)
        .eq("user_id", id).maybeSingle();
        if (error) {
            console.log(error.message);
        }
        return data as LinksProfileType;
    } catch (error) {
        unstable_rethrow(error);
        console.error(error);
    }
}

//traer toda la info de un usuario
export async function fetchFullUser(id: string): Promise<ProfileType | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("profiles")
        .select(`
            id,
            name,
            username,
            mail,
            profile_img_color,
            user_public_info (
                job_avaliable,
                student_status,
                dept,
                degree,
                desc,
                province,
                birthday
            )`
        )
        .eq("id", id)
        .maybeSingle();

    if (error) {
        console.error("Supabase error:", error.message);
        return null;
    }

    const profile: ProfileType = {
        ...data,
        user_public_info: Array.isArray(data?.user_public_info)
            ? data?.user_public_info[0] ?? null
            : data?.user_public_info,
    };

    return profile;
}

//actualizar info básica del usuario (devuelve el mensaje de error, o null si salió bien)
export async function updateBasicUser({...data}: ProfileType, id: string): Promise<string | null> {
    const supabase = await createClient();
    const { error } = await supabase.from("profiles").update({...data}).eq("id", id.trim())
    if (error) {
        console.error("Error en Supabase (profiles):", error.message)
        return error.message
    }
    return null
}

//actualizar info del usuario (devuelve el mensaje de error, o null si salió bien)
export async function updateInfoUser({...data}: UserPublicInfo, id: string): Promise<string | null> {
    const supabase = await createClient();
    const { error } = await supabase.from("user_public_info").update({...data}).eq("user_id", id.trim())
    if (error) {
        console.error("Error en Supabase (user_public_info):", error.message)
        return error.message
    }
    return null
}

//eliminar posteo
export async function deletePost(id: string): Promise<string | null> {
    const supabase = await createClient();
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
        console.error("Error al eliminar post:", error.message);
        return error.message
    }
    return null
}

//eliminar documento: primero el archivo en storage, después la fila en la tabla "documents"
export async function deleteDoc(paths: string[], id: string): Promise<string | null> {
    const supabase = await createClient();
    const { error } = await supabase.storage.from("documents").remove(paths);
    if (error) {
        console.error("Error al eliminar archivo:", error.message);
    }
    const { error: tableError } = await supabase.from("documents").delete().eq("id", id);
    if (tableError) {
        console.error("Error al eliminar documento:", tableError.message);
        return tableError.message
    }
    return null
}

export async function fetchDocsById(id: string){
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
        .from("documents")
        .select(`*`)
        .eq("user_id", id)
        if (error) {
            console.log(error.message);
        }
        return data as DocType[];
    } catch (error) {
        unstable_rethrow(error);
        console.error(error);
    }
}

// Quién está mirando la página y a qué posts les dio "me gusta".
// Para un visitante devuelve userId null y la lista vacía.
export async function fetchViewerLikes(): Promise<{ userId: string | null; likedPostIds: string[] }> {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return { userId: null, likedPostIds: [] };
        }
        const { data, error } = await supabase
            .from("post_likes")
            .select("post_id")
            .eq("user_id", user.id);
        if (error) {
            console.log(error.message);
        }
        return {
            userId: user.id,
            likedPostIds: (data ?? []).map((row) => row.post_id as string),
        };
    } catch (error) {
        unstable_rethrow(error);
        console.error(error);
        return { userId: null, likedPostIds: [] };
    }
}

//traer los comentarios de un post (del más nuevo al más viejo)
export async function fetchComments(postId: string): Promise<CommentType[]> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("post_comments")
            .select(`
                id,
                post_id,
                user_id,
                body,
                created_at,
                profiles (
                    id,
                    name,
                    profile_img_color
                )
            `)
            .eq("post_id", postId)
            .order("created_at", { ascending: false });
        if (error) {
            console.log(error.message);
            return [];
        }
        return (data ?? []) as unknown as CommentType[];
    } catch (error) {
        unstable_rethrow(error);
        console.error(error);
        return [];
    }
}

const NOTIFICATIONS_LIMIT = 20;
const EXCERPT_LENGTH = 140;

type NotificationRow = {
    id: string
    kind: NotificationKind
    post_id: string
    created_at: string
    read_at: string | null
    actor: NotificationType["actor"]
    posts: { body: string | null } | null
    post_comments: { body: string | null } | null
}

// Recorta un texto para mostrarlo como extracto ("…" si es largo)
function toExcerpt(text: string | null | undefined): string | null {
    if (!text) return null;
    const clean = text.replace(/\s+/g, " ").trim();
    return clean.length > EXCERPT_LENGTH ? `${clean.slice(0, EXCERPT_LENGTH).trimEnd()}…` : clean;
}

//traer las notificaciones de un usuario (las últimas 20) y cuántas tiene sin leer
// "actor:profiles!notifications_actor_id_fkey" porque la tabla tiene dos FK a profiles
export async function fetchNotifications(userId: string): Promise<NotificationsData> {
    try {
        const supabase = await createClient();
        const [list, unread] = await Promise.all([
            supabase
                .from("notifications")
                .select(`
                    id,
                    kind,
                    post_id,
                    created_at,
                    read_at,
                    actor:profiles!notifications_actor_id_fkey (
                        id,
                        name,
                        profile_img_color
                    ),
                    posts ( body ),
                    post_comments ( body )
                `)
                .eq("recipient_id", userId)
                .order("created_at", { ascending: false })
                .limit(NOTIFICATIONS_LIMIT),
            supabase
                .from("notifications")
                .select("id", { count: "exact", head: true })
                .eq("recipient_id", userId)
                .is("read_at", null),
        ]);
        if (list.error) {
            console.log(list.error.message);
        }
        if (unread.error) {
            console.log(unread.error.message);
        }
        const rows = (list.data ?? []) as unknown as NotificationRow[];
        return {
            notifications: rows.map((row) => ({
                id: row.id,
                kind: row.kind,
                post_id: row.post_id,
                created_at: row.created_at,
                read_at: row.read_at,
                actor: row.actor,
                post_excerpt: toExcerpt(row.posts?.body),
                comment_excerpt: toExcerpt(row.post_comments?.body),
            })),
            unreadCount: unread.count ?? 0,
        };
    } catch (error) {
        unstable_rethrow(error);
        console.error(error);
        return { notifications: [], unreadCount: 0 };
    }
}

// export async function deleteLink(id: string, name: string){
//     try {
//         const supabase = await createClient();
//         const {error} = await supabase.from("user_link").delete().eq("id", id)
//         if (error) {
//             console.log(error);
//         }else{
//             console.log("Link eliminado");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }