import Link from "next/link";

export default function page() {
  return (
    <>
        <main className="w-full min-h-screen flex text-black-main">
            <section className="w-1/2 min-h-screen flex items-center justify-center">
                <div className="w-3/5 h-fit py-10 bg-slate-50 shadow-xl flex items-center flex-col rounded-lg justify-center gap-5">
                    <div className="w-full flex items-center flex-col">
                        <h2 className="font-bold text-2xl">Iniciar sesión</h2>
                        <hr className="border border-black-main/60 w-1/2 mt-2" />
                    </div>
                    <form action="" className="w-full flex flex-col gap-2 items-center">
                        <div className="flex flex-col gap-1 w-9/12">
                            <label htmlFor="" className="px-3 font-semibold">Ingresá tu e-mail</label>
                            <input type="email" name="mail" className="h-9 rounded-full px-2 border border-black-main" />
                        </div>
                        <div className="flex flex-col gap-1 w-9/12">
                            <label htmlFor="" className="px-3 font-semibold">Ingresá tu contraseña</label>
                            <input type="password" name="password" className="h-9 rounded-full px-2 border border-black-main" />
                        </div>
                        <button type="submit" className="w-9/12 mt-3 rounded-full h-9 bg-black-main text-yellow-main font-semibold">Acceder</button>
                    </form>
                    <div className="flex items-center flex-col gap-4">
                        <div className="flex flex-col items-center gap-1">
                            <span>¿Olvidaste tu usuario o contraseña?</span>
                            <Link href="/recuperar-password" className="font-bold hover:underline cursor-pointer">Recuperarla acá</Link>
                        </div>
                        <span>¿Nuevo? <Link href="/register" className="hover:underline font-bold">Creá tu usuario acá :D</Link></span>
                    </div>
                </div>
            </section>
            <section className="w-1/2 bg-yellow-main min-h-screen flex items-center justify-end px-20">
                <div className="flex flex-col justify-end">
                    <span className="text-end">LOGO</span>
                    <h2 className="font-bold text-6xl leading-tight text-end">¡Hola!, Encantados de conocerte :D</h2>
                </div>
            </section>
        </main>
    </>
  )
}


