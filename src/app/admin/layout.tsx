import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { fetchUserById } from "../lib/data-server";

export default async function layout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient()
    const user = await supabase.auth.getUser();
    const profile = await fetchUserById(user.data.user?.id)
    console.log(profile?.role);
    if (profile?.role !== "admin") {
        redirect("/error/403-admin")
    }

    return (
        <>
            {children}
        </>
    )
}
