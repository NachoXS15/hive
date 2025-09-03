import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";

export default async function page() {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser();
    if (data.user) {
        supabase.auth.signOut();
        console.log("sesion cerrada");
        redirect("/admin/login");
    }else{
        redirect("/admin/login");
    }
}