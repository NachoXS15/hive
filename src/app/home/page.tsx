import { fetchUserById } from "../lib/data-server";
import { createClient } from "../utils/supabase/server";

export default async function page() {

    const supabase = await createClient();
    const {data, error} = await supabase.auth.getUser();
    if (error) {
        console.log("No hay perfil");
        
        // redirect("/404")
    }    
    const profile = data.user ? await fetchUserById(data.user.id) : null;
    console.log(profile);
    
    return (
        profile ? (
            <main className="flex items-center justify-center w-full h-[600px]">
                <h2 className="font-second font-semibold">Bienvenid@, <span className="bg-yellow-main text-black-main px-3 py-1 rounded">{profile?.name}</span></h2>
            </main>
        ) : (
            <main className="flex items-center justify-center w-full h-[600px]">
                <h2>Feed </h2>
            </main>
        )
    )
}
