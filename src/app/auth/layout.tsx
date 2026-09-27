import { redirect } from "next/navigation"
import { createClient } from "../utils/supabase/server"

export default async function layout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient()

    // Si ya hay sesión iniciada, no tiene sentido ver login/registro
    const { data } = await supabase.auth.getUser()
    if (data?.user) {
       redirect('/home')
    }
    return (
        <>
            {children}
        </>
    )
}
