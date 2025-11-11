import DocProfile from "@/app/components/ui/DocProfile"
import { fetchDocsById } from "@/app/lib/data-server";
import { createClient } from "@/app/utils/supabase/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link"
import { redirect } from "next/navigation";

export default async function page() {

    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
        redirect("/error/403")
    }
    const id: string = user?.id ?? ""
    const docs = await fetchDocsById(id);
    console.log(docs);
    return (
        <main className="h-fit px-5 flex justify-center items-center">
            <div className="w-full 2xl:w-3/6 xl:w-7/12 md:w-3/4 pt-5 pb-10 flex flex-col gap-5 font-second text-black-main">
                <Link href="/admin" className="absolute hover:scale-105 transition cursor-pointer rounded-full p-2 hover:text-yellow-main hover:bg-black-main"><ArrowLeft /></Link>
                <h2 className="mt-10 md:mt-0 font-bold text-center text-xl">Contenido de: {id}</h2>
                <div className="w-full flex items-center">
                    <button className="w-full">
                        <Link href={`/admin/user/${id}/content/posts`} className="w-full font-bold  text-xl py-2 px-3 md:px-5 rounded-lg font-second hover:cursor-pointer transition active:text-white">Publicaciones</Link>
                    </button>
                    <button className="w-full">
                        <Link href={`/admin/user/${id}/content/docs`} className="w-full font-bold bg-black-main text-yellow-main text-xl py-2 px-3 md:px-5 rounded-lg font-second hover:cursor-pointer transition active:text-white">Documentos</Link>
                    </button>
                </div>
                <div className="w-full grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {
                        docs && docs.length > 0 ? docs.reverse().map((doc, i) => {

                            return (
                                <DocProfile doc={doc} key={i} />
                            )
                        }) :
                            <h2 className="text-center font-second font-semibold py-10">Todavia no compartiste ningún documento.<br />¡No tengas vergüenza! :D</h2>
                    }
                </div>
            </div>
        </main>
    )
}
