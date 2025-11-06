import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
export default function page() {
    return (
        <main className="w-full bg-yellow-main flex items-center justify-center min-h-screen">
            <section className="w-full md:w-3/4 xl:w-1/2 gap-6 px-5 flex items-center flex-col justify-around">
                <Image src="/images/hive_logo.png" width={80} className="self-start" height={30} alt="" />
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="w:full md:w-1/2">
                        <h2 className="font-main text-4xl text-black-main font-bold">¡Tu contribución será muy agradecida!</h2>
                        <p className="mt-3">Tus donaciones serán utilizadas para contribuir al equipo desarrollador para poder seguir haciendo de hive, un lindo espacio para todos! :D</p>
                        <Link href="/home" className="md:flex hidden hover:text-black-main hover:bg-yellow-main transition border items-center gap-2 bg-black-main text-yellow-main w-fit p-2 rounded-lg mt-3"><ArrowLeft />Volver a Inicio</Link>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col items-center font-second gap-3">
                        <a href="" className="w-10/12 md:w-80 hover:scale-105 transition text-center py-3 text-white rounded-lg font-semibold flex items-center gap-2 justify-center" style={{ backgroundColor: "#009ee3" }}><Image src="/images/mp_logo.webp" width={40} height={40} alt="" />Donar por Mercado Pago</a>
                        <a href="" className="w-10/12 md:w-80 hover:scale-105 transition text-center py-3 bg-purple-800 text-white rounded-lg font-semibold flex items-center gap-2 justify-center"><Image src="/images/cafecito_logo.webp" width={40} height={40} alt="" />Donar por Cafecito</a>
                        <Link href="/home" className="md:hidden flex hover:text-black-main hover:bg-yellow-main transition border items-center gap-2 bg-black-main text-yellow-main w-fit p-2 rounded-lg mt-3"><ArrowLeft />Volver a Inicio</Link>
                    </div>

                </div>
            </section>
        </main>
    )
}
