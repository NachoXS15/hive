// import Image from "next/image"

import { BriefcaseBusiness, Cake, Pin, School } from "lucide-react";

// import nacho from '../src/nacho.webp'
export default function Profile() {
    return (
        <article className="bg-amber-50 shadow-xl py-7 rounded-lg md:px-10 w-full px-5 2xl:w-3/6 xl:w-10/12 md:w-3/4 h-fit">
            <section className="flex gap-20 flex-col xl:flex-row items-center justify-between">
                <div className="h-[200px] xl:h-[180px] flex items-center gap-10">
                    <div className="rounded-full self-start min-w-[150px] min-h-[150px] bg-cover bg-center" style={{ backgroundImage: `url('/images/nacho.webp')` }}>
                    </div>
                    <div className="h-full flex flex-col justify-between">
                        <div className="">
                            <h2 className="font-normal text-3xl font-main">Ignacio Joaquín Pantoja</h2>
                            <h3 className="">Lic. en Diseño y Producción Multimedial</h3>
                        </div>
                        <div id="info" className="hidden xl:flex w-full flex-wrap items-center gap-3 font-second">
                            <span className="text-xs bg-green-200 text-green-700 flex items-center gap-2 px-2 py-1 rounded"><BriefcaseBusiness /> Disponible para trabajar</span>
                            <span className="text-xs text-blue-700 bg-blue-200 flex items-center gap-2 rounded px-2 py-1"><Pin /> La Rioja, Argentina</span>
                            <span className="text-xs text-cyan-700 bg-cyan-200 flex items-center gap-2 rounded px-2 py-1"><School /> Universidad Nacional de La Rioja</span>

                        </div>
                    </div>
                </div>
                <div className="flex xl:self-start flex-row xl:flex-col flex-wrap xl:flex-nowrap items-center gap-3">
                    <span className="xl:hidden text-xs bg-green-200 text-green-700 flex items-center gap-2 px-2 py-1 rounded"><BriefcaseBusiness /> Disponible para trabajar</span>
                    <span className="xl:hidden text-xs text-blue-700 bg-blue-200 flex items-center gap-2 rounded px-2 py-1"><Pin /> La Rioja, Argentina</span>
                    <span className="xl:hidden text-xs text-cyan-700 bg-cyan-200 flex items-center gap-2 rounded px-2 py-1"><School /> Universidad Nacional de La Rioja</span>
                    <span className="text-xs bg-orange-200 text-orange-700 flex items-center gap-2 px-2 py-1 rounded"><School /> Estudiante</span>
                    <span className="text-xs bg-purple-200 text-purple-700 flex items-center gap-2 px-2 py-1 rounded"><Cake /> 03/05/2002</span>
                </div>
            </section>
            <hr className="w-20 m-auto my-10" />
            <section className="mt-10">
                <h2 className="font-bold text-xl font-second">Acerca de mí:</h2>
                <p>
                    ¡Hola! Bienvenido a mi portfolio, aquí mostraré un poco de mis trabajos, mis experiencias y mis habilidades.

                    Actualmente soy tesista en la carrera de Diseño y Producción Multimedial, ejerzo como Desarrollador Front-end freelancer, realizando trabajos para empresas privadas como para eventos importantes dentro de mi ciudad.

                    También me he desarrollado como Project Leader en varios equipos de trabajo.</p>
            </section>
            <section className="mt-5">
                <h2 className="font-bold text-xl font-second">Mis enlaces</h2>

            </section>
        </article>
    )
}
