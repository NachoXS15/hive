import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { fetchUserById } from "../lib/data-server";

export default async function layout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/auth/login")
    }
    const profile = await fetchUserById(user.id)
    if (profile?.role !== "admin") {
        redirect("/error/403-admin")
    }

    return (
        <>
            {children}
        </>
    )
}
