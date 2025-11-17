import { Mail } from "lucide-react";
import { Facebook, Instagram, Twitter, } from "../ui/Icons";
import Link from "next/link";
import Image from "next/image";
export default function Footer() {
    return (
        <footer className="w-full min-h-[600px] flex items-center justify-evenly bg-yellow-main text-black-main">
            <section className="w-full px-8 md:w-3/4 h-full py-10 gap-10 md:gap-20 flex flex-col justify-between">
                <Link href="/home" className="w-fit font-main text-4xl font-black hover:scale-110 transition">
                    <Image src="/images/hive_logo.png" alt="" width={100} height={50} />
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
                        <h3 className="font-medium text-2xl mb-4">Busquedas</h3>
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
                        <span className="hover:scale-110 cursor-pointer transition"><Instagram /></span>
                        <span className="hover:scale-110 cursor-pointer transition"><Facebook /></span>
                        <span className="hover:scale-110 cursor-pointer transition"><Mail /></span>
                        <span className="hover:scale-110 cursor-pointer transition"><Twitter /></span>
                    </div>
                    <div>
                        <p className="font-medium text-center md:text-end">Copyright &copy; 2025 | hive. - Ignacio Joaquín Pantoja - Paula Fuentes</p>
                    </div>
                </div>
            </section>
        </footer>
    )
}
