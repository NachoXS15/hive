import { User2 } from "lucide-react"
import Link from "next/link"

type Props = {
    name: string | undefined | null
    title: string | undefined | null
    id: string | undefined | null
}

export default function ProfileSearchCard({name, title, id}: Props) {
    return (
        <article className="w-full h-fit px-5 py-5 bg-slate-100 font-second rounded-lg flex items-center justify-between">
            <div className="flex gap-3 items-center">
                <div className="w-18 h-18 bg-slate-700 rounded-full"></div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold">{name}</h2>
                    <p>{title}</p>
                </div>
            </div>
            <Link href={`/home/profile/${id}`} className="flex gap-2 rounded bg-blue-200 font-semibold text-md items-center text-blue-700 px-2 py-1 hover:bg-blue-700 hover:text-blue-200"><User2 /> Ver Perfil</Link>
        </article>
    )
}
