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

//subir documento
export async function insertDoc(fileName: string, file: File, id: string | undefined) {
    try {
        const filePath = `${id}/${fileName}`
        if(!id || !filePath || !file){
            return "Faltan datos";
        }        
        const {error: errorUpload} = await supabaseClient.storage.from('documents').upload(filePath, file)
        if(errorUpload){
            console.error(errorUpload);
        }else{
            console.log("Doc publicado.");
        }
    } catch (error) {
        console.log(error);
    }
}

//agregar doc a la db
export async function insertDocDB(title: string, id: string | undefined, release_year: string) {
    try {
        const userId = id;
        if(!title || !id || release_year){
            return "Faltan datos";
        }        
        const { error } = await supabaseClient.from("documents").insert([{ user_id: userId, title, release_year }]);

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
            dept,
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
                            dept,
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

//agregar link de usuario
export async function insertLink(url: string, id: string | undefined, name: string) {
	try {
		if (!url || !id || !name) {
			return "Faltan datos";
		}

		console.log(`${name}: ${url}, ${id}`);

		// Crear el objeto dinámicamente
		const dataToInsert = {
			user_id: id,
			[name]: url, // 👈 clave dinámica
		};

		// Primero verifica si ya existe un registro para ese user_id
		const { data: existingLinks } = await supabaseClient
			.from("user_links")
			.select("id")
			.eq("user_id", id)
			.single();

			let error;

		if (existingLinks) {
		// Si ya existe, actualiza el campo correspondiente
			({ error } = await supabaseClient
				.from("user_links")
				.update(dataToInsert)
				.eq("user_id", id)
			);
		} else {
		// Si no existe, crea un nuevo registro
			({ error } = await supabaseClient
				.from("user_links")
				.insert([dataToInsert])
			);
		}

		if (error) {
			console.error("Error en Supabase:", error.message);
			return "Error al guardar el enlace.";
		}

		console.log("✅ Enlace guardado o actualizado correctamente.");
		return "OK";
	} catch (error) {
		console.error("Error general:", error);
		return "Error interno.";
	}
}