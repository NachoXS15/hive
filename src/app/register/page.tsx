'use client'

import Link from "next/link";
import { supabaseClient } from "../utils/supabase/client";
import { ProfileType, UserSignIn } from "../utils/definitions";

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

        if(password != confirmPassword){
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
            <main className="w-full min-h-screen flex text-black-main font-main">
                <section className="w-1/2 min-h-screen flex items-center justify-center">
                    <div className="w-3/5 h-fit py-10 bg-slate-50 shadow-xl flex items-center flex-col rounded-lg justify-center gap-5">
                        <div className="w-full flex items-center flex-col">
                            <h2 className="font-bold text-2xl">Iniciar sesión</h2>
                            <hr className="border border-black-main/60 w-1/2 mt-2" />
                        </div>
                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2 items-center">
                            <div className="flex flex-col gap-1 w-9/12">
                                <label htmlFor="" className="px-3">Ingresá tu e-mail</label>
                                <input type="email" name="mail" className="h-9 rounded-full px-2 border border-black-main" />
                            </div>
                            <div className="flex flex-col gap-1 w-9/12">
                                <label htmlFor="" className="px-3">Ingresá tu nombre</label>
                                <input type="text" name="name" className="h-9 rounded-full px-2 border border-black-main" />
                            </div>
                            <div className="flex flex-col gap-1 w-9/12">
                                <label htmlFor="" className="px-3">Ingresá tu usuario</label>
                                <input type="text" name="user" className="h-9 rounded-full px-2 border border-black-main" />
                            </div>
                            <div className="flex flex-col gap-1 w-9/12">
                                <label htmlFor="" className="px-3">Ingresá tu contraseña</label>
                                <input type="password" name="password" className="h-9 rounded-full px-2 border border-black-main" />
                            </div>
                            <div className="flex flex-col gap-1 w-9/12">
                                <label htmlFor="" className="px-3">Re-ingresá tu contraseña</label>
                                <input type="password" name="confirm-password" className="h-9 rounded-full px-2 border border-black-main" />
                            </div>
                            <button type="submit" className="w-9/12 mt-3 rounded-full h-9 bg-black-main text-yellow-main">Acceder</button>
                        </form>
                        <div className="flex items-center flex-col gap-4">
                            <span>¿Ya tenes cuenta?<Link href="/register" className="hover:underline font-bold"> Inicia sesión acá :D</Link></span>
                        </div>
                    </div>
                </section>
                <section className="w-1/2 bg-yellow-main min-h-screen flex items-center justify-end px-20">
                    <div className="flex flex-col justify-end">
                        <span className="text-end">LOGO</span>
                        <h2 className="font-bold text-6xl leading-tight text-end">¡Hola!, Encantados de conocerte :D</h2>
                    </div>
                </section>
            </main>
        </>
    )
}


