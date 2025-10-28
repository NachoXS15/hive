'use client'
import { useRouter } from "next/navigation"
type Props = {
    children: React.ReactNode
    href: string
    className: string

}

export default function LinkButton({ children, href, className }: Props) {
    const router = useRouter();
    const handleClick = () => {
        router.push(href)
    }

    return (
        <button onClick={handleClick} className={className}>{children}</button>
    )
}
