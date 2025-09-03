import Link from "next/link";

export default function page() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center flex-col">
        <div>Error 404</div>
        <Link href="/">Volver a Inicio</Link>
    </main>
  )
}
