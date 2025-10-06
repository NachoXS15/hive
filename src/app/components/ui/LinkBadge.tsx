import { CircleMinus } from "lucide-react";

type Props = {
	red_social: string;
	color: string;
	icon: React.ReactNode;
	link: string | undefined;
	auth_status: string | undefined
};

const colorClasses: Record<string, string> = {
	blue: "bg-blue-500 text-blue-100",
	pink: "bg-pink-500 text-pink-100",
	slate: "bg-slate-500 text-slate-100",
	red: "bg-red-500 text-red-100",
	green: "bg-green-500 text-green-100",
};
export default function LinkBadge({ red_social, color, icon, link, auth_status }: Props) {
	const classes = colorClasses[color] || "bg-gray-500 text-gray-100";

	return (
		<div className="relative">
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				className={`${classes} rounded-lg px-5 py-3 transition hover:scale-105 flex items-center gap-2 font-semibold`}
				style={{ fontSize: "0.9em" }}
			>
				{icon}
				{red_social}
			</a>
			{auth_status == "authenticated" && <button className="absolute -top-2 -right-2"><CircleMinus fill="white" stroke="red" /></button>}
		</div>
	);
}

