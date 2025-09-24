'use client'

import { insertPost } from "../../lib/data-client";


export default function CreatePost({ id }: { id: string | undefined }) {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
		const body = formData.get("body") as string
        console.log(body, id);
        
        try {
            await insertPost(body, id)
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
		
	}
    return (
        <article className="w-full h-[100px] rounded-lg gap-3 mb-15 mt-10">
            <form onSubmit={handleSubmit} action="" className="w-full h-fit flex flex-col gap-3">
                <textarea name="body" required id="" className="focus:outline-slate-700 min-h-28 bg-slate-200 rounded-lg p-3 resize-none" placeholder="¿Algo en lo que estes trabajado?"></textarea>
                <button className="w-full py-3 font-second font-black cursor-pointer bg-yellow-main  rounded-lg text-black-main hover:bg-black-main hover:text-yellow-main transition">¡Publicar!</button>
            </form>
        </article>
    )
}
