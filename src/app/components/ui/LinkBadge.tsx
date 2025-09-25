import Link from "next/link"
import { Facebook, Instagram, Twitter } from "./Icons"
import { BriefcaseBusiness } from "lucide-react"

const linksStyles = [
    { title: "Facebook", style: "bg-blue-500 rounded-lg px-5 py-3 text-blue-200 flex items-center gap-2 font-semibold" },
    { title: "Instagram", style: "bg-pink-500 rounded-lg px-5 py-3 text-pink-200 flex items-center gap-2 font-semibold"},
    { title: "X", style: "bg-slate-500 rounded-lg px-5 py-3 text-slate-200 flex items-center gap-2 font-semibold"},
]

export default function LinkBadge() {
    return (
        <div className="w-full flex gap-4 flex-wrap mt-5">
            <Link href="/" className="bg-blue-500 rounded-lg px-5 py-3 text-blue-100 flex items-center gap-2 font-semibold"><Facebook color="white" />Nacho Pantoja</Link >
            <Link href="/" className="bg-pink-500 rounded-lg px-5 py-3 text-pink-100 flex items-center gap-2 font-semibold"><Instagram color="white" />@nachoxs_</Link >
            <Link href="/" className="bg-slate-500 rounded-lg px-5 py-3 text-slate-100 flex items-center gap-2 font-semibold"><Twitter color="white" />@nachoxs_</Link >
            <Link href="/" className="bg-red-500 rounded-lg px-5 py-3 text-red-100 flex items-center gap-2 font-semibold"><BriefcaseBusiness color="white" />Porfolio/CV</Link >
        </div>
    )
}
