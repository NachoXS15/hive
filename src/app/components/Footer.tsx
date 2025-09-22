import { Mail } from "lucide-react";
import { Facebook, Instagram, Twitter,} from "./Icons";

export default function Footer() {
    return (
        <footer className="w-full h-[500px] flex items-center justify-evenly bg-yellow-main text-black-main">
            <section className="w-3/4 h-full py-10 flex flex-col justify-between">
                <h2 className="text-4xl font-black">HIVE</h2>
                <div className="flex justify-start gap-56">
                    <div>
                        <h3 className="font-medium text-2xl mb-4">Info.</h3>
                        <ul className="flex flex-col gap-3">
                            <span className="hover:bg-black-main hover:text-yellow-main">Inicio</span>
                            <span className="hover:bg-black-main hover:text-yellow-main">Nosotros</span>
                            <span className="hover:bg-black-main hover:text-yellow-main">Explorar</span>
                            <span className="hover:bg-black-main hover:text-yellow-main">Buscar</span>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-medium text-2xl mb-4">Info.</h3>
                        <ul className="flex flex-col gap-3">
                            <span className="hover:bg-black-main hover:text-yellow-main">Inicio</span>
                            <span className="hover:bg-black-main hover:text-yellow-main">Nosotros</span>
                            <span className="hover:bg-black-main hover:text-yellow-main">Explorar</span>
                            <span className="hover:bg-black-main hover:text-yellow-main">Buscar</span>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-medium text-2xl mb-4">Info.</h3>
                        <ul className="flex flex-col gap-3">
                            <span className="hover:bg-black-main hover:text-yellow-main">Inicio</span>
                            <span className="hover:bg-black-main hover:text-yellow-main">Nosotros</span>
                            <span className="hover:bg-black-main hover:text-yellow-main">Explorar</span>
                            <span className="hover:bg-black-main hover:text-yellow-main">Buscar</span>
                        </ul>
                    </div>
                </div>
                <div className="flex gap-20">
                    <span><Instagram /></span>
                    <span><Facebook /></span>
                    <span><Mail /></span>
                    <span><Twitter /></span>
                </div>
            </section>

        </footer>
    )
}
