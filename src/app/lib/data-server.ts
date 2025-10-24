import { redirect } from "next/navigation";
import { DocType, LinksProfileType, PostType, ProfileType, SimpleUserType } from "../utils/definitions";
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
        console.error(error);
    }
}

//traer un solo usuario
export async function fetchUserById(id: string){
    try {
        const supabase = await createClient();
        const {data, error} = await supabase.from("profiles").select("*").eq("id", id).maybeSingle()
        if (error) {
            console.log(error.message);
        }
        return data as SimpleUserType;
    } catch (error) {
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
        `);
        if (error) {
            console.log(error.message);
        }
        return data as PostType[];
    } catch (error) {
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
        .eq("user_id", id);
        if (error) {
            console.log(error.message);
        }
        return data as PostType[];
    } catch (error) {
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
                name
            )
        `)
        .eq("id", id)
        .maybeSingle();
        if (error) {
            console.log(error.message);
        }
        return data as PostType;
    } catch (error) {
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

//actualizar info básica del usuario
export  async function updateBasicUser({...data}: ProfileType, id: string){
    try {
        const supabase = await createClient();
        const { error } = await supabase.from("profiles").update({...data}).eq("id", id.trim())
    
        if (error) {
            console.error("Error en Supabase:", error.message)
            redirect('/error')
        }
        console.log("Perfil actualizado");
        
    } catch (error) {   
        console.log(error);
    }

}

//actualizar info del usuario
export async function updateInfoUser({...data}: ProfileType, id: string){
    try {
        const supabase = await createClient();
        const { error } = await supabase.from("user_public_info").update({...data}).eq("user_id", id.trim())
    
        if (error) {
            console.error("Error en Supabase:", error.message)
            redirect('/error')
        }
        console.log("Perfil actualizado");
        
    } catch (error) {   
        console.log(error);
    }

}

//eliminar posteo
export async function deletePost(id: string){
    try {
        const supabase = await createClient();
        const {error} = await supabase.from("posts").delete().eq("id", id).single();
        if (error) {
            console.log(error);
        }else{
            console.log("Post eliminado");
        }
    } catch (error) {
        console.log(error);
    }
}

export async function deleteDoc(path: string[], id: string){
    try {
        const supabase = await createClient();
        //borrar de storage
        const {error} = await supabase.storage.from("documents").remove(path);
        if (error) {
            console.log(error);
        }else{
            console.log("Post eliminado");
        }
        //borrar de db
        const {error: tableError} = await supabase.from('docs').delete().eq("id", id).single();
        if (tableError) {
            console.error(tableError);
        }
        location.reload()
    } catch (error) {
        console.log(error);
    }
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