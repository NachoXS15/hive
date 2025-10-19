import Link from "next/link";


export default function page() {
    return (
        <main className="w-full min-h-screen font-second flex items-center justify-center">
            <section className="w-fit bg-slate-200 rounded-lg shadow-xl flex items-center p-4 h-[300px]">
                <div className="flex flex-col justify-around items-center gap-3">
                    <h2 className="text-center text-xl">Para poder revisar tu perfil, necesitas</h2>
                    <div className="flex gap-3 items-center">
                        <Link href="/auth/login" className="text-xl font-semibold hover:text-black-main hover:bg-yellow-main px-2 text-yellow-main bg-black-main py-1 rounded-lg transition">Iniciar sesión</Link>
                        <span>o</span>
                        <Link href="/auth/register" className="text-xl font-semibold hover:text-black-main hover:bg-yellow-main px-2 text-yellow-main bg-black-main py-1 rounded-lg transition">Crear una cuenta</Link>
                    </div>
                    <Link href="/home" className="mt-10 text-black-main font-bold underline hover:scale-105 transition">Ir a Inicio</Link>
                </div>
            </section>
        </main>
    )
}
