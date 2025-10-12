// import Image from "next/image"

import { BriefcaseBusiness, Cake, Pen, Pin, School, UserPlus2 } from "lucide-react";
import { fetchFullUser, fetchLinksById } from "../../lib/data-server";
import LinksComp from "./LinksComp";
import Link from "next/link";
import formatDate from "@/app/utils/DateFormatterBd";
type Props = {
    id: string
    auth_status?: string | undefined
}

export default async function Profile({id, auth_status}: Props) {

    const profile = await fetchFullUser(id)
    const links = await fetchLinksById(id);

    let birthdayFormatted = "";
    if (profile?.user_public_info?.birthday) {
        birthdayFormatted = formatDate(profile?.user_public_info?.birthday)
    }
    return (
        <article className="bg-slate-50 font-second shadow-xl py-7 rounded-lg md:px-10 w-full px-5 2xl:w-3/6 xl:w-10/12 md:w-3/4 h-fit">
            <section className="w-full flex gap-15 xl:gap-20 flex-col xl:flex-row items-center justify-between">
                <div className="w-full h-fit xl:h-[180px] flex flex-col md:flex-row md:items-center md:gap-10">
                    <div className="flex flex-col items-center gap-2 mb-5">
                        <div className="rounded-full self-start min-w-[160px] min-h-[160px] md:min-w-[130px] md:min-h-[130px] bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url('/images/nacho.webp')` }}>
                        </div>
                        {
                            auth_status == "authenticated" ? (
                                <Link href={`/my-profile/edit/${id}`} className="px-7 md:px-1 md:w-full self-start justify-center flex items-center gap-1 py-1.5 font-semibold text-yellow-main bg-black-main hover:text-black-main hover:bg-yellow-main transition cursor-pointer rounded-lg" style={{fontSize: "0.9em"}}><Pen />Editar perfil</Link>
                            ) : (
                                <button className="px-7 md:px-1 md:w-full self-start justify-center flex items-center gap-1 py-1.5 font-semibold text-yellow-main bg-black-main hover:text-black-main hover:bg-yellow-main transition cursor-pointer rounded-lg" style={{fontSize: "0.9em"}}><UserPlus2 />Seguir</button>
                            )
                        }
                    </div>
                    <div className="w-full h-full flex flex-col justify-between">
                        <div className="w-full">
                            <div className="flex items-center gap-2">
                                <h2 className="font-normal text-3xl md:text-2xl font-main">{profile?.name}</h2>
                                <span className="bg-slate-200 rounded-lg px-3 py-1 font-semibold">@{profile?.username}</span>
                            </div>
                            <h3 className="text-md md:text-xs">{profile?.user_public_info?.degree}</h3>
                        </div>
                        <div id="info" className="hidden xl:flex w-full flex-wrap items-center gap-3 font-second">
                            <span className="text-xs bg-green-200 text-green-700 flex items-center gap-2 px-2 py-1 rounded"><BriefcaseBusiness /> {profile?.user_public_info?.job_avaliable}</span>
                            <span className="text-xs text-blue-700 bg-blue-200 flex items-center gap-2 rounded px-2 py-1"><Pin /> {profile?.user_public_info?.province}, Argentina</span>
                            <span className="text-xs text-cyan-700 bg-cyan-200 flex items-center gap-2 rounded px-2 py-1"><School /> {profile?.user_public_info?.dept}</span>

                        </div>
                    </div>
                </div>
                <div className="flex xl:self-start flex-row xl:flex-col flex-wrap xl:flex-nowrap items-center gap-3">
                    <span className="xl:hidden text-xs bg-green-200 text-green-700 flex items-center gap-2 px-2 py-1 rounded"><BriefcaseBusiness /> {profile?.user_public_info?.job_avaliable}</span>
                    <span className="xl:hidden text-xs text-blue-700 bg-blue-200 flex items-center gap-2 rounded px-2 py-1"><Pin /> {profile?.user_public_info?.province}, Argentina</span>
                    <span className="xl:hidden text-xs text-cyan-700 bg-cyan-200 flex items-center gap-2 rounded px-2 py-1"><School /> {profile?.user_public_info?.dept}</span>
                    <span className="text-xs bg-orange-200 text-orange-700 flex items-center gap-2 px-2 py-1 rounded"><School /> {profile?.user_public_info?.student_status}</span>
                    <span className="text-xs bg-purple-200 text-purple-700 flex items-center gap-2 px-2 py-1 rounded"><Cake /> {birthdayFormatted}</span>
                </div>
            </section>
            <hr className="w-20 m-auto my-10" />
            <section className="mt-10">
                <h2 className="font-bold text-xl font-second">Acerca de mí:</h2>
                <p style={{ fontSize: "0.9em" }}>{profile?.user_public_info?.desc}</p>
            </section>
            <LinksComp auth_status={auth_status} links={links} id={id} />
        </article>
    )
}
