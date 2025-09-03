import { ProfileType } from "../utils/definitions";
import { createClient } from "../utils/supabase/server"


export async function fetchUser(id: string){
    try {
        const supabase = await createClient();
        const {data, error} = await supabase.from("profiles").select("*").eq("id", id).maybeSingle()
        if (error) {
            console.log(error.message);
        }
        return data as ProfileType;
    } catch (error) {
        console.error(error);
    }
}