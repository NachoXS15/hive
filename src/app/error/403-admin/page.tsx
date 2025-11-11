import Link from "next/link";


export default function page() {
    return (
        <main className="w-full min-h-screen font-second flex items-center justify-center">
            <section className="w-fit bg-slate-200 rounded-lg shadow-xl flex items-center p-4 h-[300px]">
                <div className="flex flex-col justify-around items-center gap-3">
                    <h2 className="text-center text-xl">Para poder acceder a este sitio, necesitas permiso de administrador</h2>
                    <Link href="/home" className="text-xl font-semibold hover:text-black-main hover:bg-yellow-main px-2 text-yellow-main bg-black-main py-1 rounded-lg transition">Volver a Inicio</Link>
                </div>
            </section>
        </main>
    )
}
