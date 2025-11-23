'use client'

import { CircleMinus, FileText } from "lucide-react";
import { useState } from "react";
import { createPostWithDocument } from "@/app/lib/data-client";
import { ProfileType } from "@/app/utils/definitions";

type Props = {
    id: string | undefined
    profile: ProfileType | null
}

export default function CreatePost({ id, profile }: Props) {

    const [file, setFile] = useState<File | null>(null)
    const [fileName, setFileName] = useState("");
    const [fileActive, setFileActive] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFileActive(true)
            setFileName(files[0].name);
            setFile(files[0]);
            console.log(files[0].name);
        } else {
            setFileName("");
            setFile(null);
        }
    };

    const handleRemoveFile = () => {
        setFileName("");
        setFileActive(false)
        setFile(null);
        const input = document.getElementById("file-upload") as HTMLInputElement;
        if (input) input.value = "";
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const body = formData.get("body") as string
        const title = formData.get("title") as string
        const release_year = formData.get("year") as string
        const category = formData.get("category") as string
        const theme = formData.get("theme") as string
        console.log(body, id);

        const data = {
            body,
            title,
            release_year,
            fileActive,
            fileName,
            file,
            author: profile?.name,
            degree: profile?.user_public_info?.degree,
            dept: profile?.user_public_info?.dept,
            category,
            theme
        }
        try {
            if (!id) {
                console.log("no hay id");
            } else {
                await createPostWithDocument(data, id)
            }
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <article className="w-full h-fit rounded-lg gap-3 mt-7">
            <form onSubmit={handleSubmit} action="" className="w-full h-fit flex flex-col gap-3">
                <textarea name="body" id="" className="focus:outline-slate-700 min-h-28 bg-slate-200 rounded-lg p-3 resize-none" placeholder="¿Algo en lo que estes trabajado?" style={{ fontSize: "0.9em" }}></textarea>
                <label
                    htmlFor="file-upload"
                    className="h-15 flex flex-col items-center justify-center w-full border-2 border-dashed border-black-main rounded-lg cursor-pointer bg-slate-200 hover:bg-gray-100 transition relative"
                >
                    {!fileName && !fileActive ? (
                        <>
                            <div className="flex gap-2 items-center justify-center">
                                <FileText color="#1e1e1e" />
                                <div className="flex flex-col">
                                    <p className="text-sm text-gray-500">
                                        <span className="font-semibold">Agregar documento</span>
                                    </p>
                                    <p className="text-xs text-gray-500">Solo archivos .PDF</p>
                                </div>
                            </div>
                            <input
                                id="file-upload"
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </>
                    ) : (
                        <div className="flex items-center gap-2 font-second">
                            <FileText color="#1e1e1e" />
                            <span className="text-sm">{fileName}</span>
                            <button
                                type="button"
                                onClick={handleRemoveFile}
                                className="absolute -top-2 -right-2 hover:scale-110 transition cursor-pointer active:scale-105"
                            >
                                <CircleMinus color="red" fill="white" size={24} />
                            </button>
                        </div>
                    )}

                </label>
                {
                    fileActive && (
                        <section className="w-full">
                            <div className="flex flex-items-center gap-3">
                                <div className="w-1/2">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Titulo</label>
                                    <input type="text" required name="title" defaultValue={fileName} className="w-full bg-slate-200 mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
                                </div>
                                <div className="w-1/2">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Año de Publicación o Realización</label>
                                    <input type="text" required name="year" className="w-full bg-slate-200 mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
                                </div>
                            </div>
                            <div className="flex flex-items-center gap-3">
                                <div className="w-1/2">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Categoria</label>
                                    <select required name="category" className="w-full bg-slate-200 mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500">
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
                                <div className="w-1/2">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Temática</label>
                                    <select required name="theme" className="w-full bg-slate-200 mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500">
                                        <option value="" disabled>Selecciona una Temática</option>
                                        <option value="Diseño Gráfico">Diseño Gráfico</option>
                                        <option value="Programación o Software">Programación o Software</option>
                                        <option value="Videojuegos">Videojuegos</option>
                                        <option value="Fotografía">Fotografía</option>
                                        <option value="Realización Audiovisual">Realización Audiovisual</option>
                                        <option value="Informes Médicos">Informes Médicos</option>
                                        <option value="Informe de Lectura">Informe de Lectura</option>
                                        <option value="Proyectos de Investigación">Proyectos de Investigación</option>
                                        <option value="Analisis Historicos">Analisis Historicos</option>
                                        <option value="Criticas Literarias">Criticas Literarias</option>
                                        <option value="Informe de Prácticas Profesionales">Informe de Prácticas Profesionales</option>
                                        <option value="Informe de Prácticas Profesionales">Informe de Prácticas Profesionales</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>
                            </div>
                        </section>
                    )
                }
                <button className="w-full py-3 font-second font-black cursor-pointer bg-yellow-main  rounded-lg text-black-main hover:bg-black-main hover:text-yellow-main transition" style={{ fontSize: "0.9em" }}>¡Publicar!</button>
            </form>
        </article>
    )
}
