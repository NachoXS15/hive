import { supabaseClient } from "@/app/utils/supabase/client";

export async function insertPost(body: string, id: string | undefined) {
    try {
        const userId = id;
        if(!body || !id){
            return "Faltan datos";
        }        
        const { error } = await supabaseClient.from("posts").insert([{ user_id: userId, body }]);

        if(error){
            console.error(error);
        }else{
            console.log("Post publicado.");
        }
    } catch (error) {
        console.log(error);
    }
}
