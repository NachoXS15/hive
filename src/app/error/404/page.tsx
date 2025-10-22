import Link from "next/link";

export default function page() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center flex-col">
        <div className="font-main text-3xl">No se encontró usuario o lo que estás buscando :(</div>
        <Link href="/home" className="bg-black-main text-yellow-main rounded-lg px-2 py-1 font-bold mt-3 text-xl">Volver a Inicio</Link>
    </main>
  )
}
