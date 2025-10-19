'use server'
import { fetchFullUser } from "@/app/lib/data-server";
import { InferGetServerSidePropsType } from "next";
import { getServerSideProps } from "next/dist/build/templates/pages";
import HandleSubmit from "./actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CarrerasForm from "@/app/components/ui/CarrerasForm";
import { depts } from "@/app/lib/depts";

export default async function page({
	params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

	const { id } = await params
	const profile = await fetchFullUser(id)
	const selectedColor = profile?.profile_img_color
	return (
		<div className="flex items-center py-20 justify-center px-10 min-h-screen bg-gray-100 font-second" id="form">
			<form className="bg-white shadow-lg rounded-2xl p-8 max-w-5xl">
				<Link href="/my-profile/posts" className="absolute hover:bg-black-main hover:text-yellow-main transition p-1 rounded-full"><ArrowLeft /></Link>
				<h2 className="text-2xl font-bold mb-8 text-center">Actualizar datos de {profile?.name}</h2>
				<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-8">
					<div>
						<h3 className="text-lg font-semibold mb-4 text-gray-700">Información Personal</h3>
						<label className="block mb-2 text-sm font-medium text-gray-700">Ingresá tu Nombre</label>
						<input type="text" required name="name" defaultValue={profile?.name ?? ""} className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
						<label className="block mb-2 text-sm font-medium text-gray-700">Ingresá tu mail</label>
						<input type="text" required name="mail" defaultValue={profile?.mail ?? ""} className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
						<label className="block mb-2 text-sm font-medium text-gray-700">Ingresá tu usuario</label>
						<input type="text" required name="user" defaultValue={profile?.username ?? ""} className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
						{/* <label className="block mb-2 text-sm font-medium text-gray-700">Ingresá tu contraseña</label>
						<input type="password" required name="password" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
						<label className="block mb-2 text-sm font-medium text-gray-700">Confirmá tu contraseña</label>
						<input type="password" required name="confirm-password" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" /> */}
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4 text-gray-700">Información Profesional</h3>
						<label className="block mb-2 text-sm font-medium text-gray-700">Disponibilidad</label>
						<select required name="job_avaliable" defaultValue={profile?.user_public_info?.job_avaliable ?? ""} className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500">
							<option value="" defaultValue="Seleccionar" disabled>Seleccionar</option>
							<option value="Disponible para trabajar">Disponible para trabajar</option>
							<option value="Trabajando">Trabajando</option>
						</select>
						<CarrerasForm dept={depts} />
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4 text-gray-700">Educación</h3>
						<label className="block mb-2 text-sm font-medium text-gray-700">Universidad</label>
						<select required name="student_status" defaultValue={profile?.user_public_info?.student_status ?? ""} className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
							<option value="" defaultValue="Seleccionar" disabled>Estado de Estudiante</option>
							<option value="Estudiante">Estudiante</option>
							<option value="Freelance">Freelance</option>
							<option value="Graduado">Graduado</option>
							<option value="Posgrado">Posgrado</option>
						</select>
						<label className="block mb-2 text-sm font-medium text-gray-700">Provincia</label>
						<select className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" name="province" defaultValue={profile?.user_public_info?.province ?? ""} id="province">
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
						<input required name="birthday" defaultValue={profile?.user_public_info?.birthday ?? ""} type="date" className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
					</div>
				</div>
				<input type="hidden" name="id" defaultValue={profile?.id} />
				<section className="flex items-center gap-5">
					<div className="w-1/2 flex flex-col">
						<label className="block mb-2 text-sm font-medium text-gray-700">Color de Foto de Perfil</label>
						<div className="h-full w-full flex justify-between flex-col gap-1.5">
							<div className="w-full h-[100px] rounded-lg" style={{backgroundColor: `#${selectedColor}`}}></div>
							<div className="flex items-center justify-between px-2 py-1 border rounded-lg">
								<span>Seleccionar color:	</span>
								<input type="color" name="color_img" className="w-1/4 rounded-lg" defaultValue={selectedColor}  />
							</div>
						</div>
					</div>
					<div className="w-1/2 flex flex-col">
						<label className="block mb-2 text-sm font-medium text-gray-700">Descripción (algo que quieras contar :D)</label>
						<textarea required name="desc" defaultValue={profile?.user_public_info?.desc} className="w-full resize-none h-36 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-main focus:ring-yellow-500" />
					</div>
				</section>
				<button type="submit" formAction={HandleSubmit} className="mt-10 w-full py-2 text-yellow-main bg-black-main font-semibold rounded-lg hover:bg-yellow-main hover:text-black-main transition cursor-pointer">
					Actualizar
				</button>
			</form>
		</div>
	)
}
