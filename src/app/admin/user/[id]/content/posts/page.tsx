import AuthPost from "@/app/components/structures/AuthPost";
import { fetchDocsById, fetchPostsById } from "@/app/lib/data-server";
import Link from "next/link";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const posts = await fetchPostsById(id)
    const docs = await fetchDocsById(id);
    const auth_status = "";
    console.log(id);
    

    return (
        <main className="h-fit flex justify-center items-center">
            <div className="w-full 2xl:w-3/6 xl:w-7/12 md:w-3/4 pt-5 pb-10 flex flex-col gap-5 font-second text-black-main">
                <h2 className="font-bold text-center text-xl">Contenido de: {id}</h2>
                <div className="w-full flex items-center">
                    <button className="w-full">
                        <Link href={`/admin/user/${id}/content/posts`} className="w-full font-bold bg-black-main text-yellow-main text-xl py-2 px-3 md:px-5 rounded-lg font-second hover:cursor-pointer transition active:text-white">Publicaciones</Link>
                    </button>
                    <button className="w-full">
                        <Link href={`/admin/user/${id}/content/docs`} className="w-full font-bold text-xl py-2 px-3 md:px-5 rounded-lg font-second hover:bg-black-main hover:text-yellow-main hover:cursor-pointer transition active:text-white">Documentos</Link>
                    </button>
                </div>
                {
                    posts && posts.length > 0 ? posts.reverse().map((post, i) => {

                        return (
                            <AuthPost key={i} docs={docs} auth_status={auth_status} post={post} />
                        )
                    }) :
                        <h2 className="text-center font-second font-semibold py-10">Este usuario no ha compartido nada. <br />Esperemos se anime :D</h2>
                }
            </div>
        </main>
    )
}