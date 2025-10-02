import { supabaseClient } from "@/app/utils/supabase/client";
import { ProfileType, UserPublicInfo, UserSignIn } from "../utils/definitions";

//crear post
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

let usernameId: string | undefined = "";

//crear usuario
export async function postUser({ email, password }: UserSignIn){
    const info = {
        email: email.trim(),
        password: password,
    };

    try {
        const { data, error } = await supabaseClient.auth.signUp(info);
        usernameId = data?.user?.id
        console.log(usernameId);
        
        if (error) {
            console.log("error crear usuario: ", error);
        }
        console.log("Usuario creado!");
        
        return data;
    } catch (error) {
        console.log(error);
    }
};

//agregar usuario a db
export async function postUserDB({name, mail,username,}: ProfileType){
    try {
        const { data, error } = await supabaseClient
            .from("profiles")
            .insert([
                {
                    id: usernameId,
                    name,
                    mail,
                    username,
                },
            ])
            .select();
        console.log({ data, error });
        if (error) {
            throw error;
        }
        console.log("Usuario: insertado:", data);
        return data;
    } catch (error) {
        console.error("Error al insertar usuario:", error);
        throw error;
    }
};

//agregar info a usuario
export const postUserInfoDB = async ({
            job_avaliable,
            degree,
            university,
            desc,
            student_status,
            province,
            birthday,
        }: UserPublicInfo) => {
            try {
                const { data, error } = await supabaseClient
                    .from("user_public_info")
                    .insert([
                        {
                            user_id: usernameId,
                            job_avaliable,
                            degree,
                            university,
                            desc,
                            student_status,
                            province,
                            birthday
                        },
                    ])
                console.log({ data, error });
                if (error) {
                    throw error;
                }
                console.log("Usuario: insertado:", data);
                return data;
            } catch (error) {
                console.error("Error al insertar usuario:", error);
                throw error;
            }
        };

//actualizar info de usuario