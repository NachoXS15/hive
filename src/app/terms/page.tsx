import Image from "next/image"
import Footer from "../components/structures/Footer"
import Link from "next/link"
export default function page() {
    return (
        <>
            <header className="w-full py-5 flex bg-yellow-main items-center justify-center">
                <Link href="/" className="hover:scale-105 transition"><Image src="/images/hive_logo.png" width={80} height={30} alt="" /></Link>
            </header>
            <section className="font-second w-full md:w-3/5 px-5 flex flex-col gap-5 m-auto my-15">
                <div className="mb-5">
                    <h1 className="text-center font-bold  font-main mb-5 text-2xl">Terminos y Condiciones (12/11/2025).</h1>
                    <p>Al crear una cuenta en hive, aceptarás y deberás cumplir las siguientes condiciones</p>
                </div>
                <div>
                    <h2 className="text-xl font-bold">1. Registro y cuenta</h2>
                    <p>Para utilizar ciertas funciones, el Usuario deberá crear una cuenta proporcionando información veraz y actualizada. El Usuario es responsable de mantener la confidencialidad de sus credenciales y del uso que se haga de su cuenta.</p>
                </div>
                <hr className="w-20 border m-auto" />
                <div>
                    <h2 className="text-xl font-bold">2. Uso Permitido</h2>
                    <p>El usuario se compromete a utilizar la plataforma de manera legal, ética y respetuosa. No se permite:</p>
                    <ol>
                        <li>• Publicar contenido que infrinja derechos de autor, marcas u otros derechos de propiedad intelectual</li>
                        <li>• Publicar material ofensivo, discriminatorio o ilegal</li>
                        <li>• Usar la Plataforma con fines comerciales no autorizados o fraudulentos.</li>
                        <li>• Intentar acceder, modificar o dañar sistemas, bases de datos o redes asociadas a la Plataforma.</li>
                    </ol>
                </div>
                <hr className="w-20 border m-auto" />
                <div>
                    <h2 className="text-xl font-bold">3. Propiedad Intelectual</h2>
                    <p>El Usuario conserva todos los derechos sobre su Contenido. <br />Hive no reclama propiedad sobre los proyectos ni los comercializa sin autorización expresa del Usuario.</p>
                </div>
                <hr className="w-20 border m-auto" />
                <div>
                    <h2 className="text-xl font-bold">4. Contenido de terceros</h2>
                    <p>La Plataforma puede incluir contenido generado por otros usuarios o enlaces a sitios externos. Hive no se responsabiliza por dicho contenido ni por las acciones de terceros.</p>
                </div>
                <hr className="w-20 border m-auto" />
                <div>
                    <h2 className="text-xl font-bold">5. Nuestros derechos</h2>
                    <p>Nos reservamos el derecho de:</p>
                    <ul>
                        <li>• Modificar, suspender o eliminar el servicio en cualquier momento.</li>
                        <li>• Quitar o restringir contenido que consideremos inapropiado o que infrinja derechos.</li>
                        <li>• Actualizar estos Términos, notificando los cambios relevantes a los Usuarios.</li>
                    </ul>
                </div>
                <hr className="w-20 border m-auto" />
                <div>
                    <h2 className="text-xl font-bold">6. Limitación de Responsabilidad</h2>
                    <p>La plataforma se ofrece &ldquo;tal cual&ldquo; y &ldquo;según disponibilidad&ldquo;. no garantiza que el servicio sea ininterrumpido, seguro o libre de errores. <br />En ningún caso seremos responsables de daños directos, indirectos o pérdida de datos derivados del uso del servicio.</p>
                </div>
                <hr className="w-20 border m-auto" />
                <div>
                    <h2 className="text-xl font-bold">7. Contacto</h2>
                    <p>Por cualquier duda, contactarse al e-mail: <a href="mailto: hivearg80@gmail.com" className="text-blue-600 hover:underline">hivearg80@gmail.com</a></p>
                </div>
            </section>
            <Footer />
        </>
    )
}
