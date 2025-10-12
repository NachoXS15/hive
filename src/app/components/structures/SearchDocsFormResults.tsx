'use client'

import { ProfileType } from "../../utils/definitions"
import ProfileSearchCard from "./ProfileSearchCard"
import { useMemo, useState } from "react"

type Props = {
    profiles: ProfileType[]
}

export default function SearchFormResults({ profiles }: Props) {

    const [query, setQuery] = useState<string>("")

    const filteredProfiles = useMemo(() => {
        return profiles.filter((profile) => profile.name?.toLocaleLowerCase().includes(query.toLowerCase()))
    }, [query, profiles])

    return (
        <main className="w-full min-h-[700px] font-second flex flex-col md:flex-row justify-center items-center">
            <div className="w-full min-h-[700px] pt-10 px-10 md:w-2/12 xl:w-3/12 bg-slate-200">
                <h2 className="font-bold text-xl mb-7">Filtros</h2>
                <form action="" className="flex flex-col gap-3">
                    <div className="">
                        <label htmlFor="" className="flex justify-between items-center">Titulo</label>
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} name="search" placeholder="Escribe para comenzar a buscar..." className="w-full h-9 border border-slate-400 bg-slate-50 px-5 rounded-2xl focus:outline-none focus:ring-0" />
                    </div>
                    <div className="">
                        <label htmlFor="" className="flex justify-between items-center">Año de publicación</label>
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} name="search" placeholder="Escribe para comenzar a buscar..." className="w-full h-9 border border-slate-400 bg-slate-50 px-5 rounded-2xl focus:outline-none focus:ring-0" />
                    </div>
                    <div className="">
                        <label htmlFor="" className="flex justify-between items-center">Departamento</label>
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} name="search" placeholder="Escribe para comenzar a buscar..." className="w-full h-9 border border-slate-400 bg-slate-50 px-5 rounded-2xl focus:outline-none focus:ring-0" />
                    </div>
                    <div className="">
                        <label htmlFor="" className="flex justify-between items-center">Carrera</label>
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} name="search" placeholder="Escribe para comenzar a buscar..." className="w-full h-9 border border-slate-400 bg-slate-50 px-5 rounded-2xl focus:outline-none focus:ring-0" />
                    </div>
                </form>
            </div>
            <div className="w-full h-full px-10 mt-10 flex flex-col gap-5">
                {query ? (
                    filteredProfiles.map((profile, i) => (
                        <ProfileSearchCard key={i} id={profile.id} name={profile.name} title={profile.user_public_info?.degree} />
                    ))
                ) : (
                    <h2 className="text-center font-bold font-second text-xl mb-5">¡Encontrá documentos de calidad!</h2>
                )}
            </div>
        </main>
    )
}
