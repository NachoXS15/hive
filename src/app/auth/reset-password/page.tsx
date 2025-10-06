import Link from "next/link";


export default function page() {
  return (
    <main className="w-full min-h-screen flex text-black-main items-center justify-center font-main">
        <section className="w-full md:w-7/12 xl:w-1/2 min-h-screen px-5 xl:px-0 flex items-center justify-center font-second">
                    <div className="w-full xl:w-3/5 h-fit py-15 bg-slate-50 shadow-xl flex items-center flex-col rounded-lg justify-center gap-10">
                        <div className="w-full flex items-center flex-col">
                            <h2 className="text-2xl font-black">Recuperar Credenciales</h2>
                            <hr className="border border-black-main/60 w-1/2 mt-2" />
                        </div>
                        <form action="" className="w-full flex flex-col gap-2 items-center">
                            <div className="flex flex-col gap-1 w-9/12">
                                <label htmlFor="" className="px-3 font-bold">Ingresá tu e-mail</label>
                                <input type="email" name="email" className="h-10 rounded-full px-3 border border-black-main" />
                            </div>
                            <button className="hover:bg-yellow-main hover:text-black-main transition w-9/12 mt-3 rounded-full h-9 bg-black-main text-yellow-main cursor-pointer">Acceder</button>
                        </form>
                        <div className="flex items-center flex-col gap-4">
                            <div className="flex flex-col items-center gap-1">
                                <span><Link href="/recuperar-password" className="underline hover:cursor-pointer">Recuperarla acá</Link> o <Link href="/recuperar-password" className="underline hover:cursor-pointer">Registrate</Link></span>
                            </div>
                        </div>
                    </div>
                </section>
    </main>
  )
}
