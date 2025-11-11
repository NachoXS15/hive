import Image from "next/image";
import { fetchUsers } from "../lib/data-server";
import { ProfileType } from "../utils/definitions";
import AdminProfileSearchCard from "../components/structures/AdminProfileSearchCard";
import { Home } from "lucide-react";
import Link from "next/link";

export default async function page() {

    const profiles: ProfileType[] = (await fetchUsers()) ?? [];

    return (
        <>
            <header className="w-full bg-yellow-main h-20 relative flex items-center justify-center">
                <Link href="/home" className="absolute left-10 p-3 bg-black-main text-yellow-main text-xl rounded-full hover:bg-yellow-main border-spacing-x-2.5 border-2 transition hover:text-black-main"><Home size={28} /></Link>
                <Image src="/images/hive_logo.png" width={80} height={30} alt="" />
            </header>
            <main className="w-full flex justify-center">
                <section className="mt-10 w-full px-10 md:px-0 md:w-11/12 xl:w-9/12 2xl:w-7/12 flex flex-col justify-center items-center">
                    <h2 className="font-bold text-2xl underline">Sistema de Administración</h2>
                    <section className="my-5 w-full grid gap-3 md:grid-cols-2">
                        {profiles.map((prof, i) => (
                            <AdminProfileSearchCard id={prof.id} key={i} name={prof.name} title={prof.user_public_info?.degree} color_img={prof.profile_img_color} username={prof.username} />
                        ))}
                    </section>
                </section>
            </main>
        </>
    )
}
