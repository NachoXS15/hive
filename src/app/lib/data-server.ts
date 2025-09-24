import { PostType, ProfileType, SimpleUserType } from "../utils/definitions";
import { createClient } from "../utils/supabase/server"

export async function fetchUsers(){
    try {
        const supabase = await createClient();
        const {data, error} = await supabase.from("profiles").select(`
            id,
            name,
            username,
            mail,
            user_public_info (
                job_avaliable,
                student_status,
                university,
                degree,
                desc,
                province,
                birthday
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

export async function fetchPostsById(id: string){
    try {
        const supabase = await createClient();
        const {data, error} = await supabase.from("posts").select("*").eq("id", id)
        if (error) {
            console.log(error.message);
        }
        return data as PostType[];
    } catch (error) {
        console.error(error);
    }
}

export async function fetchFullUser(id: string): Promise<ProfileType | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("profiles")
        .select(`
            id,
            name,
            username,
            mail,
            user_public_info (
                job_avaliable,
                student_status,
                university,
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