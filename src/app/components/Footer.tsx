import { Mail } from "lucide-react";
import { Facebook, Instagram, Twitter,} from "./Icons";

export default function Footer() {
    return (
        <footer className="w-full min-h-[500px] flex items-center justify-evenly bg-yellow-main text-black-main">
            <section className="w-full px-8 md:w-3/4 h-full py-10 gap-10 md:gap-20 flex flex-col justify-between">
                <h2 className="font-main text-4xl font-black">HIVE</h2>
                <div className="flex flex-col md:flex-row flex-wrap justify-start gap-10 md:gap-56">
                    <div>
                        <h3 className="font-medium text-2xl mb-4">Info.</h3>
                        <ul className="flex flex-col gap-3">
                            <span className="hover:bg-black-main hover:text-yellow-main px-2 rounded">Inicio</span>
                            <span className="hover:bg-black-main hover:text-yellow-main px-2 rounded">Nosotros</span>
                            <span className="hover:bg-black-main hover:text-yellow-main px-2 rounded">Explorar</span>
                            <span className="hover:bg-black-main hover:text-yellow-main px-2 rounded">Buscar</span>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-medium text-2xl mb-4">Info.</h3>
                        <ul className="flex flex-col gap-3">
                            <span className="hover:bg-black-main hover:text-yellow-main px-2 rounded">Inicio</span>
                            <span className="hover:bg-black-main hover:text-yellow-main px-2 rounded">Nosotros</span>
                            <span className="hover:bg-black-main hover:text-yellow-main px-2 rounded">Explorar</span>
                            <span className="hover:bg-black-main hover:text-yellow-main px-2 rounded">Buscar</span>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-medium text-2xl mb-4">Info.</h3>
                        <ul className="flex flex-col gap-3">
                            <span className="hover:bg-black-main hover:text-yellow-main px-2 rounded">Inicio</span>
                            <span className="hover:bg-black-main hover:text-yellow-main px-2 rounded">Nosotros</span>
                            <span className="hover:bg-black-main hover:text-yellow-main px-2 rounded">Explorar</span>
                            <span className="hover:bg-black-main hover:text-yellow-main px-2 rounded">Buscar</span>
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
                        <p className="font-medium text-center md:text-end">Copyright &copy; 2025 | Hive - Ignacio Joaquín Pantoja - Paula Fuentes</p>
                    </div>
                </div>
            </section>

        </footer>
    )
}
