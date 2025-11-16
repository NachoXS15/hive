'use client'

import Link from "next/link";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { postUser, postUserDB, postUserInfoDB } from "@/app/lib/data-client";
import React, { useState } from "react";
import { depts } from "@/app/lib/depts";
export default function Page() {
    const [selectedColor, setSelectedColor] = useState("#000")
    const deptos: Record<string, string[]> = depts
    const [passMatch, setPassMatch] = useState(true)
    const [departamento, setDepartamento] = useState("");
    const [carrera, setCarrera] = useState("");
    const [termsCheck, setTermsCheck] = useState(false)
    
    const handleDeptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const dept = e.target.value;
        setDepartamento(dept);
        setCarrera(""); 
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedColor(e.target.value)        
    }

    const handleCarreraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCarrera(e.target.value);
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPassMatch(true);
        const formData = new FormData(e.currentTarget);
        //column1
        const name = formData.get("name")?.toString();
        const mail = formData.get("mail")?.toString();
        const username = formData.get("user")?.toString();
        const password = formData.get("password")?.toString();
        const confirmPassword = formData.get("confirm-password")?.toString();
        const profile_img_color = formData.get("color_img")?.toString();

        //column 2
        const job_avaliable = formData.get("job_avaliable")?.toString();
        const degree = formData.get("degree")?.toString();
        const dept = formData.get("dept")?.toString();
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
            dept,
            profile_img_color,
            desc,
            student_status,
            province,
            birthday,
        });

        if (!name || !mail || !username || !password || !confirmPassword || !student_status || !job_avaliable || !degree || !dept || !desc || !province || !birthday) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        if (password != confirmPassword) {
            console.error("Contraseñas no coinciden");
            setPassMatch(false)
            return;
        } else {
            console.log("Contraseñas coinciden");
        }

        if (!termsCheck) {
            alert("Debe aceptar terminos y condiciones")
            console.log("Debe aceptar terminos y condiciones");
            return;
        }

        try {
            await postUser({
                email: mail as string,
                password: password as string,
            });

            await postUserDB({
                name,
                mail,
                username,
                profile_img_color
            });

            await postUserInfoDB({
                job_avaliable,
                degree,
                dept,
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
                <section className="w-full bg-yellow-main min-h-screen flex items-center justify-center md:px-20">
                    <div className="w-full flex flex-col gap-3 justify-center relative items-center">
                        <Link href="/home" className="w-fit font-main text-4xl font-black hover:scale-110 transition">
                            <Image src="/images/hive_logo.png" alt="" width={80} height={30} />
                        </Link>
                        <h2 className="w-full font-bold text-3xl text-black-main md:text-7xl leading-tight text-center">¡Hola!, Encantados de conocerte :D</h2>
                        <Link href="/auth/login" className="text-yellow-main bg-black-main hover:text-black-main hover:bg-yellow-main transition cursor-pointer hover:border font-semibold font-second text-regular px-3 py-2 mt-2 md:p-3 border rounded text-center">¿Ya tenes una cuenta? Logueate :,)</Link>
                        <a href="#form" className="slide-in-bottom absolute -bottom-40 cursor-pointer"><ArrowDown size={40} /></a>
                    </div>
                </section>
                <div className="flex items-center py-20 justify-center px-3 md:px-10 min-h-screen bg-gray-100 font-second" id="form">
                    <form onSubmit={handleSubmit} className="bg-white h-fit shadow-lg rounded-2xl p-6 md:p-8 w-full max-w-5xl">
                        <h2 className="text-2xl font-bold mb-8 text-center">Formulario de Registro</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-8 mb-5">
                            {/* columna 1 */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-gray-700">Información Personal</h3>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Ingresá tu Nombre y Apellido</label>
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
                            {/* columna 2 */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-gray-700">Información Profesional</h3>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Disponibilidad</label>
                                <select required name="job_avaliable" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500">
                                    <option value="" defaultValue="Seleccionar" disabled>Seleccionar</option>
                                    <option value="Disponible para trabajar">Disponible para trabajar</option>
                                    <option value="Trabajando">Trabajando</option>
                                </select>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Departamento</label>
                                <select
                                    value={departamento}
                                    onChange={handleDeptChange}
                                    name="dept"
                                    className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                >
                                    <option value="">-- Selecciona un departamento --</option>
                                    {Object.keys(depts).map((dept) => (
                                        <option key={dept} value={dept}>
                                            {dept}
                                        </option>
                                    ))}
                                </select>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Carrera, Titulo o Cargo</label>
                                <select
                                    value={carrera}
                                    onChange={handleCarreraChange}
                                    disabled={!departamento}
                                    name="degree"
                                    className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                >
                                    <option value="">
                                        {departamento ? "-- Selecciona una carrera --" : "Selecciona un departamento primero"}
                                    </option>
                                    {departamento &&
                                        deptos[departamento]?.map((carr) => (
                                            <option key={carr} value={carr}>
                                                {carr}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            {/* columna 3 */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-gray-700">Educación</h3>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Universidad</label>
                                <select required name="student_status" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
                                    <option value="" defaultValue="Seleccionar" disabled>Estado de Estudiante</option>
                                    <option value="Estudiante">Estudiante</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Graduado">Graduado</option>
                                    <option value="Profesor">Profesor</option>
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
                        <section className="flex flex-col md:flex-row items-center gap-5">
                            <div className="w-full xl:w-1/2 flex flex-col">
                                <div className="flex text-nowrap items-center mb-2  gap-2">
                                    <label className="block text-sm font-medium text-gray-700">Color de Foto de Perfil</label>
                                    <span className="text-gray-500 font-medium" style={{fontSize: '0.8em'}}>(Pronto fotos de perfil :D)</span>
                                </div>
                                <div className="h-full w-full flex justify-between flex-col gap-2 xl:gap-1.5">
                                    <div className="w-full h-[100px] rounded-lg border" style={{ backgroundColor: `${selectedColor}` }}></div>
                                    <div className="flex items-center justify-between px-2 py-1 border rounded-lg">
                                        <span>Seleccionar color:	</span>
                                        <input type="color" name="color_img" onChange={(e) => handleColorChange(e)} className="w-1/4 rounded-lg" defaultValue={selectedColor} />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col">
                                <label className="block mb-2 text-sm font-medium text-gray-700">Descripción (algo que quieras contar :D)</label>
                                <textarea required name="desc" className="w-full resize-none h-36 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
                            </div>
                        </section>
                        <div className="my-5 m-auto text-center">
                            <input type="checkbox" onChange={() => setTermsCheck(!termsCheck)} /> <label htmlFor="">Aceptar <Link href="/terms" className="text-blue-700 hover:underline">Términos y Condiciones</Link></label>
                        </div>
                        <button type="submit" className="mt-10 w-full py-2 text-yellow-main bg-black-main font-semibold rounded-lg hover:bg-yellow-main hover:text-black-main transition cursor-pointer">
                            Registrar
                        </button>
                        {!passMatch && <h2 className="text-red-500 mt-5 font-semibold text-center">Error: Contraseñas no coindicen! Intente de nuevo.</h2>}
                    </form>
                </div>
            </main>
        </>
    )
};


