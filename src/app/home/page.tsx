import CreatePost from "../components/structures/CreatePost";
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
    const id = data.user?.id
    console.log(profile);
    
    return (
        profile ? (
            <main className="flex items-center justify-center w-full h-[600px]">
                <div className="w-1/2 flex flex-col items-center gap-10">
                    <CreatePost id={id} />
                    <h2 className="font-second font-semibold">Bienvenid@, <span className="bg-yellow-main text-black-main px-3 py-1 rounded">{profile?.name}</span></h2>
                </div>
            </main>
        ) : (
            <main className="flex items-center justify-center w-full h-[600px]">
                <h2>Feed </h2>
            </main>
        )
    )
}
