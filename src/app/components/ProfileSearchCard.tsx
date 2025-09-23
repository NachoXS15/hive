import { User2 } from "lucide-react"
import { ProfileType } from "../utils/definitions"

type Props = {
    profile: ProfileType
}

export default function ProfileSearchCard() {
    return (
        <article className="w-full h-fit px-5 py-5 bg-slate-100 font-second rounded-lg flex items-center justify-between">
            <div className="flex gap-3 items-center">
                <div className="w-20 h-20 bg-slate-700 rounded-full"></div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold">Usuario</h2>
                    <p>Diseño Multimedia</p>
                </div>
            </div>
            <span className="flex gap-2 rounded bg-blue-200 font-semibold text-blue-700 px-2 py-1 hover:bg-blue-700 hover:text-blue-200"><User2 /> Ver Perfil</span>
        </article>
    )
}
