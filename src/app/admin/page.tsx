import Image from "next/image";
import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";

export default async function page() {

    const supabase = await createClient()
    const profile = await supabase.auth.getUser();
    if (!profile.data.user?.role) {
        redirect("/error/403")
    }
    console.log(profile.data.user?.role);
    return (
        <>
            <header className="w-full bg-yellow-main h-10 flex items-center justify-center">
                <Image src="/images/hive_logo.png" width={80} height={30} alt=""/>
            </header>
            <main className="">
                <h2>Sistema de Administración</h2>
                <section>

                </section>
            </main>
        </>
    )
}
