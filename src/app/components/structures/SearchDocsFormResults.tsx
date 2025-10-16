'use client'

import { depts } from "@/app/lib/depts"
import { DocType, ProfileType } from "../../utils/definitions"
import DocSearchCard from "./DocSearchCard"
import ProfileSearchCard from "./ProfileSearchCard"
import { useMemo, useState } from "react"

type Props = {
    docs: DocType[]
}

export default function SearchFormResults({ docs }: Props) {

    const [query, setQuery] = useState<string>("")
    const [departamento, setDepartamento] = useState("");
    const [carrera, setCarrera] = useState("");
    const [releaseYear, setReleaseYear] = useState("");
    const deptos: Record<string, string[]> = depts



    const handleDepartamentoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDepartamento(e.target.value);
        setCarrera("");
    };

    const limpiarFiltros = (e: React.FormEvent) => {
        e.preventDefault()
        setQuery("");
        setDepartamento("");
        setCarrera("");
    }

    const filteredDocs = useMemo(() => {
        return docs.filter((doc) =>
            doc.title?.toLocaleLowerCase().includes(query.toLowerCase()) &&
            doc.release_year?.toLocaleLowerCase().includes(releaseYear.toLowerCase()
            //agregar otros filtros
        ))
    }, [query, docs])

    return (
        <main className="w-full min-h-[700px] font-second flex flex-col md:flex-row justify-center items-center">
            <div className="w-full min-h-[700px] pt-10 px-10 md:w-2/12 xl:w-3/12 bg-slate-200" style={{ fontSize: '0.9em' }}>
                <h2 className="font-bold text-xl mb-7">Filtros</h2>
                <form action="" className="flex flex-col gap-3">
                    <div className="w-full">
                        <label htmlFor="" className="flex justify-between items-center">Titulo</label>
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} name="search" placeholder="Escribe para comenzar a buscar..." className="w-full h-9 border border-slate-400 bg-slate-50 px-5 rounded-lg focus:outline-none focus:ring-0" />
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
                            <option value="" disabled>
                                {departamento ? "Seleccioná una carrera" : "Seleccioná un departamento"}
                            </option>
                            {departamento &&
                                deptos[departamento].map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Año de publicación</label>
                        <select
                            value={releaseYear}
                            onChange={(e) => setReleaseYear(e.target.value)}
                            className="w-full h-10 rounded-lg border border-slate-400 bg-slate-50 flex justify-between items-center px-5"
                        >
                            <option value="" disabled>Selecciona un año</option>
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                        </select>
                    </div>
                </form>
            </div>
            <div className="w-full h-full px-14 mt-10 flex flex-col gap-5">
                {query ? (
                    <div className="w-full h-[600px]">
                        <h2 className="font-bold text-xl">Documentos encontrados:</h2>
                        {
                            filteredDocs.map((doc, i) => (
                                <DocSearchCard key={i} doc={doc} />
                            ))

                        }
                    </div>
                ) : (
                    <h2 className="text-center font-bold font-second text-xl mb-5">¡Encontrá documentos de calidad!</h2>
                )}
            </div>
        </main >
    )
}
