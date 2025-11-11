import Image from "next/image";
import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";
import { fetchUsers } from "../lib/data-server";
import { ProfileType } from "../utils/definitions";
import AdminProfileSearchCard from "../components/structures/AdminProfileSearchCard";

export default async function page() {

    const supabase = await createClient()
    const profile = await supabase.auth.getUser();
    // if (!profile.data.user?.role) {
    //     redirect("/error/403")
    // }
    console.log(profile.data.user?.role);
    const profiles: ProfileType[] = (await fetchUsers()) ?? [];

    return (
        <>
            <header className="w-full bg-yellow-main h-20 flex items-center justify-center">
                <Image src="/images/hive_logo.png" width={80} height={30} alt="" />
            </header>
            <main className="w-full flex justify-center">
                <section className="mt-10 md:w-7/12 xl:w-9/12 2xl:w-7/12 flex flex-col justify-center items-center">
                    <h2 className="font-bold text-2xl underline">Sistema de Administración</h2>
                    <section className="my-5 w-full grid gap-3 md:grid-cols-2">
                        {profiles.map((prof, i) => (
                            <AdminProfileSearchCard id={prof.id} key={i} name={prof.name} title={prof.user_public_info?.degree} color_img={prof.profile_img_color} username={prof.username}/>
                        ))}
                    </section>
                </section>
            </main>
        </>
    )
}
