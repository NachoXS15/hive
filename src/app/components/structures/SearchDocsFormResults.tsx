'use client'

import { depts } from "@/app/lib/depts"
import { DocType } from "../../utils/definitions"
import DocSearchCard from "./DocSearchCard"
import { useMemo, useState } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"

type Props = {
    docs: DocType[]
}

export default function SearchFormResults({ docs }: Props) {

    const [collapsedForm, setCollapsedForm] = useState(false)
    const [query, setQuery] = useState<string>("")
    const [departamento, setDepartamento] = useState("");
    const [carrera, setCarrera] = useState("");
    const [releaseYear, setReleaseYear] = useState("");
    const [theme, setTheme] = useState("")
    const [category, setCategory] = useState("")
    const deptos: Record<string, string[]> = depts

    const collapseForm = () => {
        setCollapsedForm(!collapsedForm)
    }

    const handleDepartamentoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDepartamento(e.target.value);
        setCarrera("");
    };

    const limpiarFiltros = (e: React.FormEvent) => {
        e.preventDefault()
        setQuery("");
        setDepartamento("");
        setCarrera("");
        setReleaseYear("")
    }

    const filteredDocs = useMemo(() => {
        return docs.filter((doc) =>
            doc.title?.toLocaleLowerCase().includes(query.toLowerCase()) &&
            doc.release_year?.toLocaleLowerCase().includes(releaseYear.toLowerCase())
            //agregar otros filtros
        )
    }, [query, docs, releaseYear])


    return (
        <main className="w-full min-h-[700px] font-second flex flex-col xl:flex-row justify-between items-center">
            <div className="w-full h-full  xl:w-3/12">
                <div className="w-full xl:py-6 xl:min-h-[700px] px-7 md:w-full bg-slate-200 text-regular">
                    <div className="w-full flex items-center px-3 xl:px-0 justify-between py-5">
                        <h2 className="font-bold text-xl">Filtros</h2>
                        <button onClick={collapseForm} className="xl:hidden">{collapsedForm ? <ArrowUp /> : <ArrowDown />}</button>
                    </div>
                    <form action="" className={`${collapsedForm ? "flex" : "hidden"} xl:hidden flex-col mb-7 gap-3`}>
                        {/* <div className="w-full">
                            <label htmlFor="" className="flex justify-between items-center">Titulo</label>
                            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} name="search" placeholder="Escribe para comenzar a buscar..." className="w-full h-9 border border-slate-400 bg-slate-50 px-5 rounded-lg focus:outline-none focus:ring-0" />
                        </div> */}
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-700">Departamento</label>
                            <select
                                value={departamento}
                                name="dept"
                                onChange={handleDepartamentoChange}
                                className="w-full h-9 rounded-lg border border-slate-400 bg-slate-50 flex justify-between items-center px-5"
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
                                className="w-full h-9 rounded-lg border border-slate-400 bg-slate-50 flex justify-between items-center px-5"
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
                        <div className="w-full px-3">
                            <label className="block mb-2 text-sm font-medium text-gray-700">Año de publicación</label>
                            <select
                                value={releaseYear}
                                onChange={(e) => setReleaseYear(e.target.value)}
                                className="w-full h-9 rounded-lg border border-slate-400 bg-slate-50 flex justify-between items-center px-5"
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
                        {query || releaseYear ? <button onClick={limpiarFiltros} className="w-full py-2 text-white rounded-lg mt-3 bg-red-500">Limpiar Filtros</button> : null}
                    </form>
                    <form action="" className={`hidden xl:flex flex-col mb-7 gap-3`}>
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
                                className="w-full h-9 rounded-lg border border-slate-400 bg-slate-50 flex justify-between items-center px-5"
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
                            <label className="block mb-2 text-sm font-medium text-gray-700">Año de publicación o Realización</label>
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
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-700">Tipo de Documento</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full h-10 rounded-lg border border-slate-400 bg-slate-50 flex justify-between items-center px-5"
                            >
                                <option value="" disabled>Selecciona un Tipo</option>
                                <option value="Tesis">Tesis</option>
                                <option value="Trabajo Final de Carrera">Trabajo Final de Carrera</option>
                                <option value="Apunte">Apunte</option>
                                <option value="Investigación">Investigación</option>
                                <option value="Trabajo Práctico">Trabajo Práctico</option>
                                <option value="Prod. Audiovisual">Prod. Audiovisual</option>
                                <option value="Recurso">Recurso</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-700">Temática</label>
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                className="w-full h-10 rounded-lg border border-slate-400 bg-slate-50 flex justify-between items-center px-5"
                            >
                                <option value="" disabled>Selecciona una Temática</option>
                                <option value="Tesis">Tesis</option>
                                <option value="Trabajo Final de Carrera">Trabajo Final de Carrera</option>
                                <option value="Apunte">Apunte</option>
                                <option value="Investigación">Investigación</option>
                                <option value="Trabajo Práctico">Trabajo Práctico</option>
                                <option value="Prod. Audiovisual">Prod. Audiovisual</option>
                                <option value="Prod. Propia">Prod. Propia</option>
                                <option value="Recurso">Recurso</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        {query || releaseYear ? <button onClick={limpiarFiltros} className="w-full py-2 text-white rounded-lg mt-3 bg-red-500">Limpiar Filtros</button> : null}
                    </form>
                </div>
                <div className="xl:hidden w-full px-10 mt-5">
                    <label htmlFor="" className="flex justify-between items-center text-sm">Titulo</label>
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} name="search" placeholder="Escribe para comenzar a buscar..." className="w-full h-9 border border-slate-400 bg-slate-50 px-5 rounded-lg focus:outline-none focus:ring-0" />
                </div>
            </div>
            <div className="w-full h-full px-6 pb-7 xl:px-8 mt-10 flex flex-col gap-5">
                {filteredDocs.length > 0 ? (
                    <div className="w-full min-h-[600px]">
                        <h2 className="font-bold text-xl">¡Encontrá documentos de calidad!</h2>
                        <div className="grid w-full h-fit gap-2 md:gap-5 grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                            {
                                filteredDocs.map((doc, i) => (
                                    <DocSearchCard key={i} doc={doc} />
                                ))
                            }
                        </div>
                    </div>
                ) : (
                    <h2 className="text-center font-bold font-second text-xl mb-5"></h2>
                )}
            </div>
        </main >
    )
}
