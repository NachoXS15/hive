

export default function CreatePost() {
    return (
        <article className="w-full h-[100px] rounded-lg gap-3 mb-15 mt-10">
            <form action="" className="w-full h-fit flex flex-col gap-3">
                <textarea name="body" id="" className="focus:outline-slate-700 min-h-28 bg-slate-200 rounded-lg p-3 resize-none" placeholder="¿Algo en lo que estes trabajado?"></textarea>
                <button className="w-full py-3 font-second font-black cursor-pointer bg-yellow-main  rounded-lg text-black-main hover:bg-black-main hover:text-yellow-main transition">¡Publicar!</button>
            </form>
        </article>
    )
}
