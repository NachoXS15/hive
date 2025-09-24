import { redirect } from "next/navigation";
import { fetchUserById } from "../lib/data-server";
import { createClient } from "../utils/supabase/server";

export default async function page() {

    const supabase = await createClient();
    const {data, error} = await supabase.auth.getUser();
    if (error) {
        redirect("/404")
    }    
    const profile = await fetchUserById(data.user?.id);
    
    return (
        <main className="flex items-center justify-center w-full h-[600px]">
            <h2 className="font-second font-semibold">Bienvenid@, <span className="bg-yellow-main text-black-main px-3 py-1 rounded">{profile?.name}</span></h2>
        </main>
    )
}
