import Link from "next/link";
import Image from 'next/image'
import { Facebook, Instagram, Mail, Twitter } from "../components/ui/Icons";
export default function page() {
    return (
        <>
            <main className="bg-yellow-main w-full min-h-screen py-10 flex items-center justify-center flex-col gap-10">
                <section className="h-full">
                    <div className="flex justify-center flex-col items-center gap-3">
                        <Image src="/images/hive_logo.png" alt="" width={80} height={30} />
                        <h2 className="text-center font-main font-bold text-3xl mb-8 text-black-main">Equipo Desarrollador</h2>
                    </div>
                    <div className="flex items-center flex-col md:flex-row gap-8 md:gap-20 font-second">
                        <div className="flex items-center flex-col">
                            <div className="rounded-full w-40 h-40 mb-5 md:mb-7 bg-cover bg-center border-2 " style={{ backgroundImage: `url("/images/nacho.webp")` }}></div>
                            <h2 className="font-bold text-xl mb-1">Ignacio Joaquín Pantoja</h2>
                            <span>EPM 955</span>
                            <p className="px-5 md:px-0 italic text-center">&ldquo;Crear Hive fue una experiencia llena de aprendizaje, <br  className="hidden md:block"/>un camino divertido pero a la vez llena de desafios. <br  className="hidden md:block"/>Totalmente orgulloso del objetivo alcanzado {"<3"}&ldquo;</p>
                        </div>
                        <div className="flex items-center flex-col">
                            <div className="rounded-full w-40 h-40 mb-5 md:mb-7 bg-cover bg-bottom border-2 text-regular" style={{ backgroundImage: `url("/images/pauli.png")` }}></div>
                            <h2 className="font-bold text-xl mb-1">Paula Fuentes</h2>
                            <span>EPM 559</span>
                            <p className="px-5 md:px-0 italic text-center">&ldquo;Este proyecto refleja en cada “click” el esfuerzo y compromiso diario<br  className="hidden md:block"/> de este dúo dinamita.Hive nos dejó su huella, estamos muy contentos<br  className="hidden md:block"/>  con lo logrado y los comentarios de usuarios :D&ldquo;</p>
                        </div>
                    </div>
                </section>
                <section className="h-full">
                    <h2 className="text-center font-main font-bold text-3xl mb-8 text-black-main">Acerca del Proyecto</h2>
                    <p className="text-center font-second leading-8 px-5"><span className="text-yellow-main bg-black-main px-3 py-1 rounded-lg">Hive</span> es un Proyecto creado para el Trabajo Final de Carrera de la <br className="md:hidden" /><span className="text-yellow-main bg-black-main px-2 py-0.5 rounded-lg">Licenciatura en Diseño y Producción Multimedial</span>, <br /> lanzada por la <span className="text-yellow-main bg-black-main px-3 py-0.5 rounded-lg">Universidad Nacional de La Rioja</span>, creada por el Equipo Desarrollador, teniendo a <br className="md:hidden" /><span className="text-yellow-main bg-black-main px-3 py-0.5 rounded-lg">Ariel Alan Rivadulla</span> como <br />tutor disciplinar acompañando y guiando el proceso en todo momento.</p>
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
