import { unstable_rethrow } from "next/navigation";
import { DocType, LinksProfileType, PostType, ProfileType, SimpleUserType, UserPublicInfo } from "../utils/definitions";
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

//traer todos los posts
export async function fetchPosts(){
    try {
        const supabase = await createClient();
        const {data, error} = await supabase.from("posts").select(`
            *,
            profiles (
                id,
                name,
                profile_img_color
            )
        `)
        .order("created_at", { ascending: false });
        if (error) {
            console.log(error.message);
        }
        return data as PostType[];
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
        .select(`
            *,
            profiles (
                id,
                name,
                profile_img_color
            )
        `)
        .eq("user_id", id)
        .order("created_at", { ascending: false });
        if (error) {
            console.log(error.message);
        }
        return data as PostType[];
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
        .select(`
            *,
            profiles (
                id,
                name,
                profile_img_color
            )
        `)
        .eq("id", id)
        .maybeSingle();
        if (error) {
            console.log(error.message);
        }
        return data as PostType;
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