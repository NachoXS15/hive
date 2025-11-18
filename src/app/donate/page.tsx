import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Mail, Twitter } from "../components/ui/Icons"
export default function page() {
    return (
        <>
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
            <footer className="w-full min-h-[600px] flex items-center justify-evenly text-yellow-main" style={{ backgroundColor: "#121211" }}>
                <section className="w-full px-8 md:w-3/4 h-full py-10 gap-10 md:gap-20 flex flex-col justify-between">
                    <Link href="/home" className="w-fit font-main text-4xl font-black hover:scale-110 transition">
                        <Image src="/images/hive_logo_yellow.png" alt="" width={100} height={50} />
                    </Link>
                    <div className="flex flex-col md:flex-row flex-wrap justify-start gap-10 md:gap-56">
                        <div>
                            <h3 className="font-medium text-2xl mb-4">Empezar</h3>
                            <ul className="flex flex-col gap-3">
                                <Link href="/" className="hover:bg-black-main hover:text-yellow-main active:bg-black-main active:text-yellow-main px-2 rounded">Inicio</Link>
                                <Link href="/home" className="hover:bg-black-main hover:text-yellow-main active:bg-black-main active:text-yellow-main px-2 rounded">Feed</Link>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium text-2xl mb-4">Búsquedas</h3>
                            <ul className="flex flex-col gap-3">
                                <Link href="/search/profiles" className="hover:bg-black-main hover:text-yellow-main active:bg-black-main active:text-yellow-main px-2 rounded">Buscar Perfiles</Link>
                                <Link href="/search/documents" className="hover:bg-black-main hover:text-yellow-main active:bg-black-main active:text-yellow-main px-2 rounded">Buscar Documentos</Link>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium text-2xl mb-4">Info.</h3>
                            <ul className="flex flex-col gap-3">
                                <Link href="/aboutus" className="hover:bg-black-main hover:text-yellow-main active:bg-black-main active:text-yellow-main px-2 rounded">Nosotros</Link>
                                <Link href="/donate" className="hover:bg-black-main hover:text-yellow-main active:bg-black-main active:text-yellow-main px-2 rounded">Donaciones</Link>
                                <Link href="/terms" className="hover:bg-black-main hover:text-yellow-main active:bg-black-main active:text-yellow-main px-2 rounded">Términos y Condiciones</Link>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 justify-between">
                        <div className="flex gap-10 md:gap-20">
                            <span className="hover:scale-110 cursor-pointer transition"><Instagram color="#ffd836" /></span>
                            <span className="hover:scale-110 cursor-pointer transition"><Facebook color="#ffd836" /></span>
                            <span className="hover:scale-110 cursor-pointer transition"><Mail color="#ffd836" /></span>
                            <span className="hover:scale-110 cursor-pointer transition"><Twitter color="#ffd836" /></span>
                        </div>
                        <div>
                            <p className="font-medium text-center md:text-end">Copyright &copy; 2025 | hive. - Ignacio Joaquín Pantoja - Paula Fuentes</p>
                        </div>
                    </div>
                </section>
            </footer>
        </>
    )
}
