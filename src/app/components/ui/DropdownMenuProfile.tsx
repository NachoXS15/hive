import { User } from "@supabase/supabase-js";
import { LogIn, LogOut, User2, UserPlus2 } from "lucide-react";
import Link from "next/link";
export default function DropdownMenuProfile({ profile }: { profile: User | null }) {
    return (
        <div className="hidden peer-checked:block z-50 w-52 absolute rounded-2xl bg-black-main text-yellow-main top-20 right-20" id="menu-open">
            <div className="w-full bg-semi-black bg-opacity-20 h-fit z-50">
                <nav className="w-full flex flex-col gap-1 p-3 font-medium">
                    {
                        profile?.role == "authenticated" ? (
                            <>
                                <Link href="/my-profile/posts" className="flex items-center text-regular gap-2 py-2 w-full px-2 rounded hover:text-black-main hover:bg-yellow-main font-medium active:scale-110 transition"><User2 /> Mi Perfil</Link>
                                {/* <Link href="/home/profile" className="flex items-center text-regular gap-2 py-2 w-full px-2 rounded hover:text-black-main hover:bg-yellow-main font-medium active:scale-110 transition"><SettingsIcon /> Configuración</Link> */}
                                <Link href="/auth/logout" className="flex items-center text-regular gap-2 py-2 w-full px-2 rounded hover:text-black-main hover:bg-yellow-main font-medium active:scale-110 transition"><LogOut /> Cerrar sesión</Link>
                            </>
                        ): (
                            <>
                                <Link href="/auth/login" className="flex items-center text-regular gap-2 py-2 w-full px-2 rounded hover:text-black-main hover:bg-yellow-main font-medium active:scale-110 transition"><LogIn /> Iniciar sesión</Link>
                                <Link href="/auth/register" className="flex items-center text-regular gap-2 py-2 w-full px-2 rounded hover:text-black-main hover:bg-yellow-main font-medium active:scale-110 transition"><UserPlus2 /> Crear cuenta</Link>
                            </>
                        )
                    }
                </nav>
            </div>
        </div>
    )
}
