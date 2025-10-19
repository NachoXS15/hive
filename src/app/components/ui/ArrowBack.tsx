import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
    href: string
}
export default function ArrowBack({href}: Props) {
    return (
        <Link 
            href={href}
            className="self-start hover:bg-black-main hover:text-yellow-main transition p-1 rounded-full"
        >
            <ArrowLeft />
        </Link>
    )
}
