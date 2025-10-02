'use server'
import { fetchFullUser } from "@/app/lib/data-server";
import { InferGetServerSidePropsType } from "next";
import { getServerSideProps } from "next/dist/build/templates/pages";
import HandleSubmit from "./actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function page({
	params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

	const { id } = params
	const profile = await fetchFullUser(id)
	console.log(profile);
	


	return (
		<div className="flex items-center py-20 justify-center px-10 min-h-screen bg-gray-100 font-second" id="form">
			<form className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-5xl">
				<Link href="/home/my-profile" className="absolute hover:bg-black-main hover:text-yellow-main transition p-1 rounded-full"><ArrowLeft /></Link>
				<h2 className="text-2xl font-bold mb-8 text-center">Actualizar datos de {profile?.name}</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-8">
					<div>
						<h3 className="text-lg font-semibold mb-4 text-gray-700">Información Personal</h3>
						<label className="block mb-2 text-sm font-medium text-gray-700">Ingresá tu Nombre</label>
						<input type="text" required name="name" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
						<label className="block mb-2 text-sm font-medium text-gray-700">Ingresá tu mail</label>
						<input type="text" required name="mail" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
						<label className="block mb-2 text-sm font-medium text-gray-700">Ingresá tu usuario</label>
						<input type="text" required name="user" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
						<label className="block mb-2 text-sm font-medium text-gray-700">Ingresá tu contraseña</label>
						<input type="text" required name="password" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
						<label className="block mb-2 text-sm font-medium text-gray-700">Confirmá tu contraseña</label>
						<input type="text" required name="confirm-password" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4 text-gray-700">Información Profesional</h3>
						<label className="block mb-2 text-sm font-medium text-gray-700">Disponibilidad</label>
						<select required name="job_avaliable" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500">
							<option value="" defaultValue="Seleccionar" disabled>Seleccionar</option>
							<option value="Disponible para trabajar">Disponible para trabajar</option>
							<option value="Trabajando">Trabajando</option>
						</select>
						<label className="block mb-2 text-sm font-medium text-gray-700">Carrera, Titulo o Cargo</label>
						<input type="text" required name="degree" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
						<label className="block mb-2 text-sm font-medium text-gray-700">Universidad</label>
						<select required name="university" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" id="universidad">
							<option value="Universidad de Buenos Aires">Universidad de Buenos Aires</option>
							<option value="Universidad Nacional de La Plata">Universidad Nacional de La Plata</option>
							<option value="Universidad Nacional de Córdoba">Universidad Nacional de Córdoba</option>
							<option value="Universidad Nacional de Mar del Plata">Universidad Nacional de Mar del Plata</option>
							<option value="Universidad Nacional del Centro de la Provincia de Buenos Aires">Universidad Nacional del Centro de la Provincia de Buenos Aires</option>
							<option value="Universidad Nacional de San Martín">Universidad Nacional de San Martín</option>
							<option value="Universidad Tecnológica Nacional">Universidad Tecnológica Nacional</option>
							<option value="Universidad Nacional de Quilmes">Universidad Nacional de Quilmes</option>
							<option value="Universidad Nacional de Tucumán">Universidad Nacional de Tucumán</option>
							<option value="Universidad Nacional de Rosario">Universidad Nacional de Rosario</option>
							<option value="Universidad Nacional del Litoral">Universidad Nacional del Litoral</option>
							<option value="Universidad Nacional de San Luis">Universidad Nacional de San Luis</option>
							<option value="Universidad Nacional del Comahue">Universidad Nacional del Comahue</option>
							<option value="Pontificia Universidad Católica Argentina">Pontificia Universidad Católica Argentina</option>
						</select>
						<label className="block mb-2 text-sm font-medium text-gray-700">Descripción (algo que quieras contar :D)</label>
						<textarea required name="desc" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4 text-gray-700">Educación</h3>
						<label className="block mb-2 text-sm font-medium text-gray-700">Universidad</label>
						<select required name="student_status" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
							<option value="" defaultValue="Seleccionar" disabled>Estado de Estudiante</option>
							<option value="Estudiante">Estudiante</option>
							<option value="Freelance">Freelance</option>
							<option value="Graduado">Graduado</option>
							<option value="Posgrado">Posgrado</option>
						</select>
						<label className="block mb-2 text-sm font-medium text-gray-700">Provincia</label>
						<select className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" name="province" id="province">
							<option value="Buenos Aires">Buenos Aires</option>
							<option value="Catamarca">Catamarca</option>
							<option value="Chaco">Chaco</option>
							<option value="Chubut">Chubut</option>
							<option value="Córdoba">Córdoba</option>
							<option value="Corrientes">Corrientes</option>
							<option value="Entre Ríos">Entre Ríos</option>
							<option value="Formosa">Formosa</option>
							<option value="Jujuy">Jujuy</option>
							<option value="La Pampa">La Pampa</option>
							<option value="La Rioja">La Rioja</option>
							<option value="Mendoza">Mendoza</option>
							<option value="Misiones">Misiones</option>
							<option value="Neuquén">Neuquén</option>
							<option value="Río Negro">Río Negro</option>
							<option value="Salta">Salta</option>
							<option value="San Juan">San Juan</option>
							<option value="San Luis">San Luis</option>
							<option value="Santa Cruz">Santa Cruz</option>
							<option value="Santa Fe">Santa Fe</option>
							<option value="Santiago del Estero">Santiago del Estero</option>
							<option value="Tierra del Fuego">Tierra del Fuego</option>
							<option value="Tucumán">Tucumán</option>
							<option value="Ciudad Autónoma de Buenos Aires">Ciudad Autónoma de Buenos Aires</option>
						</select>
						<label className="block mb-2 text-sm font-medium text-gray-700">Fecha de Nacimento</label>
						<input required name="birthday" type="date" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
					</div>
				</div>
				<button type="submit" formAction={HandleSubmit} className="mt-10 w-full py-2 text-yellow-main bg-black-main font-semibold rounded-lg hover:bg-yellow-main hover:text-black-main transition cursor-pointer">
					Registrar
				</button>
			</form>
		</div>
	)
}
