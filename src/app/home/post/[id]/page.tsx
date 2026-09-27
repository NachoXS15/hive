import Post from "@/app/components/structures/Post";
import ArrowBack from "@/app/components/ui/ArrowBack";
import { fetchSinglePost } from "@/app/lib/data-server";
import { redirect } from "next/navigation";

export default async function page({
    params,
}: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const post = await fetchSinglePost(id)
    if (!post) {
        redirect("/error/404")
    }
    const pathname = `/home/post/${id}`
    return (
        <main className="flex items-center min-h-[600px] justify-center w-full h-fit px-10">
            <div className="w-full md:w-7/12 bg-slate-200 py-5 xl:w-5/12 rounded-lg h-fit flex flex-col items-center">
                <div className="w-full p-3 flex items-center gap-2 relative">
                    <ArrowBack href="/home" />
                    <h2 className="font-bold font-second text-xl">Publicación</h2>
                </div>
                <Post pathname={pathname} post={post} />
            </div>
        </main>
    )
}
