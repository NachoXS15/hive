// import Image from "next/image"

import { BriefcaseBusiness, Cake, Pin, School } from "lucide-react";
import { fetchFullUser } from "../../lib/data-server";
import LinksComp from "../LinksComp";
type Props = {
    id: string
}

export default async function Profile({id}: Props) {

    const profile = await fetchFullUser(id)
    
    return (
        <article className="bg-slate-50 shadow-xl py-7 rounded-lg md:px-10 w-full px-5 2xl:w-3/6 xl:w-10/12 md:w-3/4 h-fit">
            <section className="flex gap-20 flex-col xl:flex-row items-center justify-between">
                <div className="h-[200px] xl:h-[180px] flex items-center gap-10">
                    <div className="rounded-full self-start min-w-[150px] min-h-[150px] bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url('/images/nacho.webp')` }}>
                        {/* <Image src="" alt="" width={150} height={150} /> */}
                    </div>
                    <div className="h-full flex flex-col justify-between">
                        <div className="">
                            <h2 className="font-normal text-3xl font-main">{profile?.name}</h2>
                            <h3 className="">{profile?.user_public_info?.degree}</h3>
                        </div>
                        <div id="info" className="hidden xl:flex w-full flex-wrap items-center gap-3 font-second">
                            <span className="text-xs bg-green-200 text-green-700 flex items-center gap-2 px-2 py-1 rounded"><BriefcaseBusiness /> {profile?.user_public_info?.job_avaliable}</span>
                            <span className="text-xs text-blue-700 bg-blue-200 flex items-center gap-2 rounded px-2 py-1"><Pin /> {profile?.user_public_info?.province}, Argentina</span>
                            <span className="text-xs text-cyan-700 bg-cyan-200 flex items-center gap-2 rounded px-2 py-1"><School /> {profile?.user_public_info?.university}</span>

                        </div>
                    </div>
                </div>
                <div className="flex xl:self-start flex-row xl:flex-col flex-wrap xl:flex-nowrap items-center gap-3">
                    <span className="xl:hidden text-xs bg-green-200 text-green-700 flex items-center gap-2 px-2 py-1 rounded"><BriefcaseBusiness /> {profile?.user_public_info?.job_avaliable}</span>
                    <span className="xl:hidden text-xs text-blue-700 bg-blue-200 flex items-center gap-2 rounded px-2 py-1"><Pin /> {profile?.user_public_info?.province}, Argentina</span>
                    <span className="xl:hidden text-xs text-cyan-700 bg-cyan-200 flex items-center gap-2 rounded px-2 py-1"><School /> {profile?.user_public_info?.university}</span>
                    <span className="text-xs bg-orange-200 text-orange-700 flex items-center gap-2 px-2 py-1 rounded"><School /> {profile?.user_public_info?.student_status}</span>
                    <span className="text-xs bg-purple-200 text-purple-700 flex items-center gap-2 px-2 py-1 rounded"><Cake /> {profile?.user_public_info?.birthday}</span>
                </div>
            </section>
            <hr className="w-20 m-auto my-10" />
            <section className="mt-10">
                <h2 className="font-bold text-xl font-second">Acerca de mí:</h2>
                <p>{profile?.user_public_info?.desc}</p>
            </section>
            <LinksComp />
        </article>
    )
}
