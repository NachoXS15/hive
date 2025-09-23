import { Search } from "lucide-react";

export default function page() {
	return (
		<main className="w-full min-h-[600px] flex justify-center">
			<div className="w-5/12 mt-20">
				<form action="" className="">
					<h2 className="text-center font-bold font-second text-2xl mb-5">¡Encontrá personas maravillosas!</h2>
					<label htmlFor="" className="w-full h-20 rounded-2xl border border-slate-400 bg-slate-50 flex justify-between items-center px-5">
						<input type="text" name="search" placeholder="Buscar..." className="w-full text-xl rounded-lg h-3/4 focus:outline-none focus:ring-0" />
						<button type="submit" className="cursor-pointer hover:scale-110 active:scale-110 transition"><Search /></button>
					</label>
				</form>
			</div>
		</main>
	)
}
