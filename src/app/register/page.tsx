'use client'

import Link from "next/link";
import { supabaseClient } from "../utils/supabase/client";
import { ProfileType, UserSignIn } from "../utils/definitions";
import { ArrowDown } from "lucide-react";

export default function page() {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name")?.toString();
        const mail = formData.get("mail")?.toString();
        const username = formData.get("user")?.toString();
        const password = formData.get("password")?.toString();
        const confirmPassword = formData.get("confirm-password")?.toString();

        console.log({
            name,
            mail,
            username,
            password,
            confirmPassword
        });

        if (!name || !mail || !username || !password || !confirmPassword) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        if (password != confirmPassword) {
            console.error("Contraseñas no coinciden");
            return;
        }

        let usernameId: string | undefined = "";

        const postUser = async ({ email, password }: UserSignIn) => {
            const info = {
                email: email.trim(),
                password: password,
            };

            try {
                const { data, error } = await supabaseClient.auth.signUp(info);
                console.log(data);
                usernameId = data.user?.id;
                if (error) {
                    console.log("error crear usuario: ", error);
                }
                return data;
            } catch (error) {
                console.log(error);
            }
        };

        const postUserDB = async ({
            name,
            mail,
            username,
        }: ProfileType) => {
            try {
                const { data, error } = await supabaseClient
                    .from("profiles")
                    .insert([
                        {
                            id: usernameId,
                            name,
                            mail,
                            username,
                        },
                    ])
                    .select();
                console.log({ data, error });
                if (error) {
                    throw error;
                }
                console.log("Usuario: insertado:", data);
                return data;
            } catch (error) {
                console.error("Error al insertar usuario:", error);
                throw error;
            }
        };

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
            window.location.href = "/home";
        } catch (error) {
            console.log("Error: ", error);
        }
    };
    return (
        <>
            <main className="w-full min-h-screen flex-col text-black-main font-main smooth">
                <section className="w-full bg-yellow-main min-h-screen flex items-center justify-center px-20">
                    <div className="flex flex-col justify-center relative items-center">
                        <span className="text-center text-2xl">HIVE</span>
                        <h2 className="font-bold text-7xl leading-tight text-center">¡Hola!, Encantados de conocerte :D</h2>
                        <a href="#form" className="slide-in-bottom absolute -bottom-40 cursor-pointer"><ArrowDown size={40} /></a>
                    </div>
                </section>
                <div className="flex items-center justify-center px-10 min-h-screen bg-gray-100 font-second" id="form">
                    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-5xl">
                        <h2 className="text-2xl font-bold mb-8 text-center">Formulario de Registro</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-gray-700">Información Personal</h3>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Ingresá tu Nombre</label>
                                <input type="text" required name="name" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <label className="block mb-2 text-sm font-medium text-gray-700">Ingresá tu mail</label>
                                <input type="text" required name="mail" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <label className="block mb-2 text-sm font-medium text-gray-700">Ingresá tu usuario</label>
                                <input type="text" required name="user" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <label className="block mb-2 text-sm font-medium text-gray-700">Ingresá tu contraseña</label>
                                <input type="text" required name="password" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <label className="block mb-2 text-sm font-medium text-gray-700">Confirmá tu contraseña</label>
                                <input type="text" required name="confirm-password" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-gray-700">Información Profesional</h3>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Empresa</label>
                                <input type="text" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-gray-700">Educación</h3>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Nivel Educativo</label>
                                <select className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Seleccionar</option>
                                    <option value="secundario">Secundario</option>
                                    <option value="terciario">Terciario</option>
                                    <option value="universitario">Universitario</option>
                                    <option value="posgrado">Posgrado</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="mt-10 w-full py-2 text-yellow-main bg-black-main font-semibold rounded-lg hover:bg-yellow-main hover:text-black-main transition">
                            Registrar
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}


