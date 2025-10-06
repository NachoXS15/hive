'use client'

import Link from "next/link";
import { ArrowDown, Plus } from "lucide-react";
import { postUser, postUserDB, postUserInfoDB } from "@/app/lib/data-client";
import { useState } from "react";

export default function Page() {

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        //column1
        const name = formData.get("name")?.toString();
        const mail = formData.get("mail")?.toString();
        const username = formData.get("user")?.toString();
        const password = formData.get("password")?.toString();
        const confirmPassword = formData.get("confirm-password")?.toString();

        //column 2
        const job_avaliable = formData.get("job_avaliable")?.toString();
        const degree = formData.get("degree")?.toString();
        const university = formData.get("university")?.toString();
        const desc = formData.get("desc")?.toString();

        //column3
        const student_status = formData.get("student_status")?.toString();
        const province = formData.get("province")?.toString();
        const birthday = formData.get("birthday")?.toString();


        console.log({
            name,
            mail,
            username,
            password,
            confirmPassword,
            job_avaliable,
            degree,
            university,
            desc,
            student_status,
            province,
            birthday,
        });

        if (!name || !mail || !username || !password || !confirmPassword || !student_status || !job_avaliable || !degree || !university || !desc || !province || !birthday) {
            console.error("Todos los campos son obligatorios");
            return;
        }


        if (password != confirmPassword) {
            console.error("Contraseñas no coinciden");
        } else {
            console.log("Contraseñas coinciden");
        }


        try {
            await postUser({
                email: mail as string,
                password: password as string,
            });

            await postUserDB({
                name,
                mail,
                username
            });

            await postUserInfoDB({
                job_avaliable,
                degree,
                university,
                desc,
                student_status,
                province,
                birthday,
            });
            window.location.href = "/auth/login";
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    return (
        <>
            <main className="w-full min-h-screen flex-col text-black-main font-main">
                <section className="w-full bg-yellow-main min-h-screen flex items-center justify-center px-20">
                    <div className="w-full flex flex-col justify-center relative items-center">
                        <span className="font-main text-3xl font-black">HIVE</span>
                        <h2 className="w-full text- font-bold text-3xl md:text-7xl leading-tight text-center">¡Hola!, Encantados de conocerte :D</h2>
                        <Link href="/auth/login" className="text-yellow-main bg-black-main hover:text-black-main hover:bg-yellow-main transition cursor-pointer hover:border font-semibold font-second px-1 py-2 mt-2 md:p-3 border rounded text-center">¿Ya tenes una cuenta? Logueate :,)</Link>
                        <a href="#form" className="slide-in-bottom absolute -bottom-40 cursor-pointer"><ArrowDown size={40} /></a>
                    </div>
                </section>
                <div className="flex items-center py-20 justify-center px-10 min-h-screen bg-gray-100 font-second" id="form">
                    <form onSubmit={handleSubmit} className="bg-white h-fit shadow-lg rounded-2xl p-8 w-full max-w-5xl">
                        <h2 className="text-2xl font-bold mb-8 text-center">Formulario de Registro</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-gray-700">Información Personal</h3>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Ingresá tu Nombre</label>
                                <input type="text" required name="name" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
                                <label className="block mb-2 text-sm font-medium text-gray-700">Ingresá tu mail</label>
                                <input type="text" required name="mail" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
                                <label className="block mb-2 text-sm font-medium text-gray-700">Ingresá tu usuario</label>
                                <input type="text" required name="user" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
                                <label className="block mb-2 text-sm font-medium text-gray-700">Ingresá tu contraseña</label>
                                <input type="password" required name="password" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
                                <label className="block mb-2 text-sm font-medium text-gray-700">Confirmá tu contraseña</label>
                                <input type="password" required name="confirm-password" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-gray-700">Información Profesional</h3>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Disponibilidad</label>
                                <select required name="job_avaliable" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500">
                                    <option value="" defaultValue="Seleccionar" disabled>Seleccionar</option>
                                    <option value="Disponible para trabajar">Disponible para trabajar</option>
                                    <option value="Trabajando">Trabajando</option>
                                </select>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Carrera, Titulo o Cargo</label>
                                <input type="text" required name="degree" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
                                <label className="block mb-2 text-sm font-medium text-gray-700">Universidad</label>
                                <select required name="university" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" id="universidad">
                                    <option value="Universidad de Buenos Aires">Universidad de Buenos Aires</option>
                                    <option value="Universidad Nacional de La Plata">Universidad Nacional de La Plata</option>
                                    <option value="Universidad Nacional de Córdoba">Universidad Nacional de Córdoba</option>
                                    <option value="Universidad Nacional de Mar del Plata">Universidad Nacional de Mar del Plata</option>
                                    <option value="Universidad Nacional del Centro de la Provincia de Buenos Aires">Universidad Nacional del Centro de la Provincia de Buenos Aires</option>
                                    <option value="Universidad Nacional de San Martín">Universidad Nacional de San Martín</option>
                                    <option value="Universidad Tecnológica Nacional">Universidad Tecnológica Nacional</option>
                                    <option value="Universidad Nacional de Quilmes">Universidad Nacional de Quilmes</option>
                                    <option value="Universidad Nacional de Tucumán">Universidad Nacional de Tucumán</option>
                                    <option value="Universidad Nacional de Rosario">Universidad Nacional de Rosario</option>
                                    <option value="Universidad Nacional del Litoral">Universidad Nacional del Litoral</option>
                                    <option value="Universidad Nacional de San Luis">Universidad Nacional de San Luis</option>
                                    <option value="Universidad Nacional del Comahue">Universidad Nacional del Comahue</option>
                                    <option value="Pontificia Universidad Católica Argentina">Pontificia Universidad Católica Argentina</option>
                                </select>

                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-gray-700">Educación</h3>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Universidad</label>
                                <select required name="student_status" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
                                    <option value="" defaultValue="Seleccionar" disabled>Estado de Estudiante</option>
                                    <option value="Estudiante">Estudiante</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Graduado">Graduado</option>
                                    <option value="Posgrado">Posgrado</option>
                                </select>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Provincia</label>
                                <select className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" name="province" id="province">
                                    <option value="Buenos Aires">Buenos Aires</option>
                                    <option value="Catamarca">Catamarca</option>
                                    <option value="Chaco">Chaco</option>
                                    <option value="Chubut">Chubut</option>
                                    <option value="Córdoba">Córdoba</option>
                                    <option value="Corrientes">Corrientes</option>
                                    <option value="Entre Ríos">Entre Ríos</option>
                                    <option value="Formosa">Formosa</option>
                                    <option value="Jujuy">Jujuy</option>
                                    <option value="La Pampa">La Pampa</option>
                                    <option value="La Rioja">La Rioja</option>
                                    <option value="Mendoza">Mendoza</option>
                                    <option value="Misiones">Misiones</option>
                                    <option value="Neuquén">Neuquén</option>
                                    <option value="Río Negro">Río Negro</option>
                                    <option value="Salta">Salta</option>
                                    <option value="San Juan">San Juan</option>
                                    <option value="San Luis">San Luis</option>
                                    <option value="Santa Cruz">Santa Cruz</option>
                                    <option value="Santa Fe">Santa Fe</option>
                                    <option value="Santiago del Estero">Santiago del Estero</option>
                                    <option value="Tierra del Fuego">Tierra del Fuego</option>
                                    <option value="Tucumán">Tucumán</option>
                                    <option value="Ciudad Autónoma de Buenos Aires">Ciudad Autónoma de Buenos Aires</option>
                                </select>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Fecha de Nacimento</label>
                                <input required name="birthday" type="date" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
                            </div>
                        </div>
                        <section className="flex items-center gap-5">
                            <div className="flex w-full gap-5 my-5">
                                <div className="flex flex-col items-center justify-center w-full">
                                    <span className="self-start block mb-2 text-sm font-medium text-gray-700">Foto de perfil</span>
                                    <label
                                        htmlFor="file-upload"
                                        className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-bluemain rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                                    >
                                        <div aria-disabled={fileActive} className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Plus />
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                                            </p>
                                            <p className="text-xs text-gray-500">Solo archivos .JPG, .JPEG, .PNG</p>
                                        </div>
                                        <input id="file-upload" type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
                                    </label>
                                    {fileName && (
                                        <p className="mt-3 text-sm text-gray-700">
                                            Archivo seleccionado: {fileName}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="w-full flex flex-col">
                                <label className="block mb-2 text-sm font-medium text-gray-700">Descripción (algo que quieras contar :D)</label>
                                <textarea required name="desc" className="w-full resize-none h-36 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
                            </div>

                        </section>
                        <button type="submit" className="mt-10 w-full py-2 text-yellow-main bg-black-main font-semibold rounded-lg hover:bg-yellow-main hover:text-black-main transition cursor-pointer">
                            Registrar
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
};


