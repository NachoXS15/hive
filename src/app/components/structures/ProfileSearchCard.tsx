import { User2 } from "lucide-react"
import Link from "next/link"

type Props = {
    name: string | undefined | null
    title: string | undefined | null
    id: string | undefined | null
    username?: string | undefined | null
}

export default function ProfileSearchCard({name, title, id, username}: Props) {
    return (
        <Link href={`/profile/${id}/posts`} className="w-full h-fit px-2 md:px-5 py-5 bg-slate-100 font-second rounded-lg flex items-center justify-between">
            <div className="flex gap-3 items-center">
                <div className="h-10 w-10 md:min-w-18 md:min-h-18 bg-slate-700 rounded-full"></div>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <h2 className="text-regular md:text-xl font-bold">{name}</h2>
                        <span className="bg-slate-200 rounded-lg px-3 py-1 text-xs font-semibold">@{username}</span>
                    </div>
                    <p className="text-xs md:text-md text-wrap">{title}</p>
                </div>
            </div>
            <Link href={`/profile/${id}/posts`} className="flex gap-2 rounded bg-blue-200 font-semibold text-md items-center text-blue-700 px-2 py-1 hover:bg-blue-700 hover:text-blue-200"><User2 /><span className="hidden md:inline">Ver perfil</span></Link>
        </Link>
    )
}
