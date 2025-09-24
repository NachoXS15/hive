'use client'

import { Search } from "lucide-react"
import { ProfileType } from "../../utils/definitions"
import ProfileSearchCard from "./ProfileSearchCard"
import { useMemo, useState } from "react"

type Props = {
    profiles: ProfileType[]
}

export default function SearchFormResults({profiles}: Props) {

    const [query, setQuery] = useState<string>("")

    const filteredProfiles = useMemo(() => {
        return profiles.filter((profile) => profile.name?.toLocaleLowerCase().includes(query.toLowerCase()))
    }, [query, profiles])

    return (
        <>
            <div className="w-full px-5 md:w-5/12 mt-20">
                <form action="" className="">
                    <h2 className="text-center font-bold font-second text-3xl mb-5">¡Encontrá personas maravillosas!</h2>
                    <label htmlFor="" className="w-full h-15 rounded-2xl border border-slate-400 bg-slate-50 flex justify-between items-center px-5">
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} name="search" placeholder="Buscar..." className="w-full text-xl rounded-lg h-1/2 focus:outline-none focus:ring-0" />
                        <button type="submit" className="cursor-pointer hover:scale-110 active:scale-110 transition"><Search /></button>
                    </label>
                </form>
            </div>
            <div className="w-full md:w-5/12 mt-10 h-fit flex flex-col gap-5 pb-10">
                {query && (
                    filteredProfiles.map((profile, i) => (
                        <ProfileSearchCard key={i} id={profile.id} name={profile.name} title={profile.user_public_info?.degree} />
                    ))
                )}
            </div>
        </>
    )
}
