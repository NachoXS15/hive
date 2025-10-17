import MenuStateReset from "../components/misc/MenuStateReset";
import Footer from "../components/structures/Footer";
import Header from "../components/structures/Header";
import { fetchUserById } from "../lib/data-server";
import { createClient } from "../utils/supabase/server";



export default async function layout({ children }: { children: React.ReactNode }) {

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser()

    const profile = user ? await fetchUserById(user?.id) : null
    // const auth_status = user?.role
    // const id: string = user?.id ?? ""
    return (
        <>
            <MenuStateReset />
            <Header profile={user} profileName={profile?.name} />
            <main className="w-full h-fit flex items-center flex-col md:px-0">
                {children}
            </main>
            <Footer />
        </>
    )
}
