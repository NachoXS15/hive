import { redirect } from "next/navigation";

// El cierre de sesión ahora se hace con la Server Action `logoutAction`
// (src/app/lib/actions.ts). Esta ruta queda solo por compatibilidad.
export default function page() {
    redirect("/auth/login");
}
