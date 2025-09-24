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
        <main className="flex w-full h-[600px] flex-col">
            <div className="">
                <h2>Bienvenid@, {profile?.name}</h2>
            </div>
        </main>
    )
}
