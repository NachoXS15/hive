import { redirect } from "next/navigation";
import { fetchUser } from "../lib/data-server";
import { ProfileType } from "../utils/definitions";
import { createClient } from "../utils/supabase/server";

export default async function page() {

    const supabase = await createClient();
    const {data, error} = await supabase.auth.getUser();
    if (error) {
        redirect("/404")
    }
    const profile: ProfileType = await fetchUser(data.user?.id);

    return (
        <main className="flex w-full flex-col">
            <div className="">
                <h2>Bienvenido, {profile.id}</h2>
            </div>
        </main>
    )
}
