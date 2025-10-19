import Post from "@/app/components/structures/Post";
import { fetchDocsById,  fetchPostsById } from "@/app/lib/data-server";
import Link from "next/link";


export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const posts = await fetchPostsById(id)
    const docs = await fetchDocsById(id);
    const auth_status = "";
    console.log(id);
    

    return (
        <>
            <div className="w-full pt-5 pb-10 flex flex-col gap-5 font-second text-black-main">
                <div className="w-full flex items-center">
                    <button className="w-full">
                        <Link href={`/profile/${id}/posts`} className="w-full font-bold bg-black-main text-yellow-main text-xl py-2 px-5 rounded-lg font-second hover:cursor-pointer transition active:text-white">Publicaciones</Link>
                    </button>
                    <button className="w-full">
                        <Link href={`/profile/${id}/docs`} className="w-full font-bold text-xl py-2 px-5 rounded-lg font-second hover:bg-black-main hover:text-yellow-main hover:cursor-pointer transition active:text-white">Documentos</Link>
                    </button>
                </div>
                {
                    posts && posts.length > 0 ? posts.reverse().map((post, i) => {

                        return (
                            <Post key={i} docs={docs} auth_status={auth_status} post={post} />
                        )
                    }) :
                        <h2 className="text-center font-second font-semibold">Este usuario no ha compartido nada. <br />Esperemos se anime :D</h2>
                }
            </div>
        </>
    )
}