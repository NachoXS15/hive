'use client'

import { Trash2 } from "lucide-react"
import { ProfileType } from "../../utils/definitions"
import ProfileSearchCard from "./ProfileSearchCard"
import { useMemo, useState } from "react"
import { depts } from "@/app/lib/depts"

type Props = {
    profiles: ProfileType[]
}

export default function SearchFormResults({ profiles }: Props) {

    const [query, setQuery] = useState<string>("")
    const [estamento, setEstamento] = useState<string>("")
    const [departamento, setDepartamento] = useState("");
    const [carrera, setCarrera] = useState("");

    const handleDepartamentoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDepartamento(e.target.value);
        setCarrera("");
    };

    const deptos: Record<string, string[]> = depts

    const filteredProfiles = useMemo(() => {
        // Un filtro vacío no excluye a nadie (aunque el perfil no tenga ese dato cargado)
        const matches = (value: string | null | undefined, filter: string) =>
            !filter || (value ?? "").toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        return profiles.filter((profile) =>
            (matches(profile.name, query) || matches(profile.username, query)) &&
            matches(profile.user_public_info?.dept, departamento) &&
            matches(profile.user_public_info?.degree, carrera) &&
            matches(profile.user_public_info?.student_status, estamento)
        )
    }, [query, profiles, departamento, carrera, estamento])

    const limpiarFiltros = (e: React.FormEvent) => {
        e.preventDefault()
        setQuery("");
        setDepartamento("");
        setCarrera("");
        setEstamento("")
    }

    return (
        <>
            <div className="w-full px-3 md:w-10/12 xl:w-8/12 mt-20">
                <form action="" className="w-full m-auto">
                    <h2 className="w-full text-center font-bold font-second text-3xl mb-5">¡Encontrá personas maravillosas!</h2>
                    <div className="w-full grid grid-cols-1 xl:grid-cols-4 gap-3">
                        <div className="w-full">
                            <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-700">Nombre</label>
                            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} name="search" placeholder="Buscar usuarios..." className="w-full h-10 rounded-lg border border-slate-400 bg-slate-50 flex justify-between items-center px-5" />
                        </div>
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-700">Estamento</label>
                            <select
                                value={estamento}
                                name="student_status"
                                onChange={(e) => setEstamento(e.target.value)}
                                className="w-full h-10 rounded-lg border border-slate-400 bg-slate-50 flex justify-between items-center px-5"
                            >
                                <option value="">Seleccioná un estamento</option>
                                <option value="Estudiante">Estudiante</option>
                                <option value="Graduado">Graduado</option>
                                <option value="Posgrado">Posgrado</option>
                                <option value="Profesor">Profesor</option>
                                <option value="Freelance">Freelance</option>

                            </select>
                        </div>
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-700">Departamento</label>
                            <select
                                value={departamento}
                                name="dept"
                                onChange={handleDepartamentoChange}
                                className="w-full h-10 rounded-lg border border-slate-400 bg-slate-50 flex justify-between items-center px-5"
                            >
                                <option value="">Seleccioná un departamento</option>
                                {Object.keys(deptos).map((d) => (
                                    <option key={d} value={d}>
                                        {d}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-700">Carrera</label>
                            <select
                                value={carrera}
                                name="degree"
                                onChange={(e) => setCarrera(e.target.value)}
                                disabled={!departamento}
                                className="w-full h-10 rounded-lg border border-slate-400 bg-slate-50 flex justify-between items-center px-5"
                            >
                                <option value="">
                                    {departamento ? "Seleccioná una carrera" : "Seleccioná un departamento primero"}
                                </option>
                                {departamento &&
                                    deptos[departamento].map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div className="w-full md:w-10/12 px-3 xl:w-8/12 mt-10 h-fit flex flex-col gap-5 font-second pb-10">
                <div className="flex items-center justify-between">
                    {query || departamento || carrera || estamento ? <h2 className="font-bold">Perfiles encontrados</h2> : null}
                    {query || departamento || carrera || estamento ? <button onClick={(e) => limpiarFiltros(e)} className="w-fit self-start flex items-center gap-2 text-regular bg-red-500 text-white rounded-lg px-2 py-1"><Trash2 />Limpiar filtros</button> : ""}
                </div>
                {(query || departamento || carrera || estamento) && filteredProfiles.length === 0 && (
                    <p className="text-center font-semibold py-5">No se encontraron perfiles con esos filtros.</p>
                )}
                {(query || departamento || carrera || estamento) && (
                    filteredProfiles.map((profile, i) => (
                        <ProfileSearchCard key={i} student_status={profile.user_public_info?.student_status} color_img={profile.profile_img_color} id={profile.id} username={profile.username} name={profile.name} title={profile.user_public_info?.degree} />
                    ))
                )}
            </div>
        </>
    )
}
