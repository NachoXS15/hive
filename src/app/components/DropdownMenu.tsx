import { LogOut, SettingsIcon, User2 } from "lucide-react";
import Link from "next/link";
export default function DropdownMenu() {
    return (
        <div className="hidden peer-checked:block z-50 w-52 absolute rounded-2xl bg-black-main text-yellow-main top-20 right-20" id="menu-open">
            <div className="w-full bg-semi-black bg-opacity-20 h-fit z-50">
                <nav className="w-full flex flex-col gap-2 p-3 font-medium">
                    <Link href="/home/my-profile" className="flex items-center gap-2 py-2 w-full px-2 rounded hover:text-black-main hover:bg-yellow-main font-medium active:scale-110 transition"><User2 /> Mi Perfil</Link>
                    <Link href="/home/profile" className="flex items-center gap-2 py-2 w-full px-2 rounded hover:text-black-main hover:bg-yellow-main font-medium active:scale-110 transition"><SettingsIcon /> Configuración</Link>
                    <Link href="/logout" className="flex items-center gap-2 py-2 w-full px-2 rounded hover:text-black-main hover:bg-yellow-main font-medium active:scale-110 transition"><LogOut /> Cerrar sesión</Link>
                </nav>
            </div>
        </div>
    )
}
