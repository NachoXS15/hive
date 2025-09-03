import { createClient } from "../utils/supabase/server"

const supabase = await createClient();

export async function fetchUser(id: string){
    try {
        const {data, error} = await supabase.from("profiles").select("*").eq("id", id).single();
        if (error) {
            console.log(error);
        }
        return data
    } catch (error) {
        console.error(error);
    }
}