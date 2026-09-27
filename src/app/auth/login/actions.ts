'use server'

import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server"
import { revalidatePath } from "next/cache";


export default async function login(formData: FormData){

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email: (formData.get("email") as string ?? "").trim(),
        password: formData.get("password") as string
    })
    if(error){
        console.error("Error de login:", error.message);
        redirect('/auth/login?error=credenciales')
    }
    revalidatePath('/', 'layout')
    redirect('/home')
}
