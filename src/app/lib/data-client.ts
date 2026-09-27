import { supabaseClient } from "@/app/utils/supabase/client";
import { ProfileType, UserPublicInfo, UserSignIn } from "../utils/definitions";
import { PostFormData } from "../utils/definitions";

const MAX_FILE_SIZE_MB = 20;

type CreatePostResult = { success: boolean; message: string; post_id?: string };

export async function createPostWithDocument(formData: PostFormData, id: string | undefined): Promise<CreatePostResult> {

    const fixFileName = (name: string) => {
        return name
            .normalize("NFD")                    // separa acentos
            .replace(/[\u0300-\u036f]/g, "")     // elimina acentos
            .replace(/ñ/g, "n")                  // ñ → n
            .replace(/Ñ/g, "N")                  // Ñ → N
            .replace(/\s+/g, "_")                // espacios → _
            .replace(/[^a-zA-Z0-9._-]/g, "");    // elimina caracteres inválidos
    };

    if (!formData.body?.trim() || !id) {
        return { success: false, message: "Escribí algo antes de publicar." };
    }

    // Validar el archivo ANTES de crear nada
    if (formData.fileActive) {
        if (!formData.file) {
            return { success: false, message: "No se encontró el archivo seleccionado." };
        }
        if (formData.file.type !== "application/pdf") {
            return { success: false, message: "Solo se permiten archivos PDF." };
        }
        if (formData.file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            return { success: false, message: `El archivo supera los ${MAX_FILE_SIZE_MB} MB.` };
        }
    }

    try {
        // 1️⃣ Crear el post
        const { data: postData, error } = await supabaseClient
            .from("posts")
            .insert([{ user_id: id, body: formData.body.trim() }])
            .select()
            .single();

        if (error || !postData) {
            console.error("Error al crear post:", error?.message);
            return { success: false, message: "No se pudo publicar. Intentá de nuevo." };
        }

        // 2️⃣ Subir y registrar el documento si corresponde
        if (formData.fileActive && formData.file) {
            // prefijo con timestamp para que dos archivos con el mismo nombre no choquen
            const filePath = `${id}/${Date.now()}_${fixFileName(formData.fileName)}`;

            const { error: errorUpload } = await supabaseClient.storage
                .from("documents")
                .upload(filePath, formData.file, { contentType: "application/pdf" });

            if (errorUpload) {
                console.error("Error al subir documento:", errorUpload.message);
                // deshacer el post para no dejar una publicación sin su archivo
                await supabaseClient.from("posts").delete().eq("id", postData.id);
                return { success: false, message: "No se pudo subir el documento." };
            }

            const { error: docError } = await supabaseClient.from("documents").insert([
                {
                    user_id: id,
                    post_id: postData.id,
                    title: formData.title,
                    release_year: formData.release_year,
                    author: formData.author,
                    file_path: filePath,
                    dept: formData.dept,
                    degree: formData.degree,
                    category: formData.category,
                    theme: formData.theme
                },
            ]);
            if (docError) {
                console.error("Error al registrar documento:", docError.message);
                await supabaseClient.storage.from("documents").remove([filePath]);
                await supabaseClient.from("posts").delete().eq("id", postData.id);
                return { success: false, message: "No se pudo guardar el documento." };
            }
        }

        return {
            success: true,
            message: "Publicación creada correctamente",
            post_id: postData.id,
        };
    } catch (error) {
        console.error("Error en createPostWithDocument:", error);
        return { success: false, message: "Error al crear publicación" };
    }
}

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
        if(!title || !id || !release_year){
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


//crear usuario en Supabase Auth. Lanza un error si falla.
export async function postUser({ email, password }: UserSignIn){
    const { data, error } = await supabaseClient.auth.signUp({
        email: email.trim(),
        password,
    });
    if (error) {
        throw error;
    }
    if (!data.user) {
        throw new Error("No se pudo crear el usuario.");
    }
    return data;
};

//agregar usuario a db
export async function postUserDB(userId: string, {name, mail, username, profile_img_color}: ProfileType){
    const { data, error } = await supabaseClient
        .from("profiles")
        .insert([
            {
                id: userId,
                name,
                mail,
                username,
                profile_img_color
            },
        ])
        .select();
    if (error) {
        console.error("Error al insertar perfil:", error.message);
        throw error;
    }
    return data;
};

//agregar info a usuario
export async function postUserInfoDB(userId: string, {
    job_avaliable,
    degree,
    dept,
    desc,
    student_status,
    province,
    birthday,
}: UserPublicInfo) {
    const { data, error } = await supabaseClient
        .from("user_public_info")
        .insert([
            {
                user_id: userId,
                job_avaliable,
                degree,
                dept,
                desc,
                student_status,
                province,
                birthday
            },
        ])
    if (error) {
        console.error("Error al insertar info de usuario:", error.message);
        throw error;
    }
    return data;
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