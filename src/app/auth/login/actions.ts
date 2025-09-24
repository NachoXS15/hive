'use server'

import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server"
import { revalidatePath } from "next/cache";


export default async function login(formData: FormData){

    const supabase = await createClient();

    const {data, error} = await supabase.auth.signInWithPassword({
        email: formData.get("email") as string,
        password: formData.get("password") as string
    })
    if(error){
        console.log(error);
        redirect('/error')
    }
    console.log(data);
    revalidatePath('/home')
    redirect('/home')
}