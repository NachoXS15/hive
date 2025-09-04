import { redirect } from "next/navigation";
import { fetchUser } from "../lib/data-server";
import { createClient } from "../utils/supabase/server";
import Link from "next/link";

export default async function page() {

    const supabase = await createClient();
    const {data, error} = await supabase.auth.getUser();
    if (error) {
        redirect("/404")
    }
    console.log(data.user.id);
    
    const profile = await fetchUser(data.user?.id);
    console.log(profile);
    
    return (
        <main className="flex w-full flex-col">
            <div className="">
                <h2>Bienvenid@, {profile?.name}</h2>
                <Link className="text-blue-600 underline" href="/logout">Cerrar sesión</Link>
            </div>
        </main>
    )
}
