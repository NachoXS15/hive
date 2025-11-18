// import Link from "next/link";
// import BackgroundExport from "./components/Background";

import { Home, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, Twitter } from "./components/ui/Icons";

export default function page() {
    return (
        <>
            <header className="bg-yellow-main w-full h-24 md:h-20 px-7 md:px-44 flex items-center justify-between">
                <Image src="/images/hive_logo.png" alt="" width={100} height={50} />
                <Link href="/home" className="p-3 bg-black-main text-yellow-main text-xl rounded-full hover:bg-yellow-main border-spacing-x-2.5 border-2 transition hover:text-black-main"><Home size={28} /></Link>
            </header>
            <main className="w-full pt-5 min-h-screen bg-yellow-main flex text-black-main flex-col  items-center justify-center">
                <div className="flex flex-col items-center mb-20 gap-5 justify-center">
                    <h2 className="text-6xl md:text-7xl px-3 xl:px-0 text-start md:text-center font-main">¡Un espacio para quienes quieren crecer!</h2>
                    <p className="w-full md:w-2/4 text-start md:text-center font-medium px-5"><i>&quot;Hive&quot;</i> es una plataforma orientada a la comunidad universitaria de la UNLaR, creada con el proposito de brindar un espacio de repositorio para publicar documentos, trabajos prácticos o cualquier tipo de producción, con el fin de difundirlos.</p>
                    <hr className="border w-20 md:hidden block" />
                    <p className="font-medium text-wrap px-7 leading-9">Creado por <span className="text-yellow-main text-nowrap bg-black-main rounded-lg px-2 py-1">Ignacio Joaquín Pantoja</span> y <span className="text-yellow-main text-nowrap bg-black-main rounded-lg px-2 py-1">Paula Fuentes</span></p>
                    <Link href="/home" className="group ml-7 mt-2 md:ml-0 self-start md:self-center hover:text-black-main hover:bg-yellow-main border transition text-yellow-main bg-black-main rounded-lg px-3 py-2 flex items-center gap-2"><Star className="star-icon" />Comenzá a Explorar</Link>
                </div>
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
    );
}
