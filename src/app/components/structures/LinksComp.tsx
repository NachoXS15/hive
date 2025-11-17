import { BriefcaseBusiness } from "lucide-react";
import { Facebook, Instagram, Twitter } from "../ui/Icons";
import LinkBadge from "../ui/LinkBadge";
import { LinksProfileType } from "@/app/utils/definitions";
import AddLink from "./AddLink";

type Props = {
	links: LinksProfileType | undefined
	auth_status: string | undefined
	id: string | undefined
}

export default function LinksComp({links, auth_status, id}: Props) {
	
	return (
		<section className="mt-5">
			<h2 className="font-bold text-xl font-second">Mis enlaces</h2>
			<div className="mt-3 w-full flex gap-4 flex-wrap">
				{!links && <h2>No hay enlaces</h2>}
				{links?.facebook && <LinkBadge auth_status={auth_status} color="blue" link={links.facebook} red_social="Facebook" icon={<Facebook color="white" />} />}
				{links?.instagram && <LinkBadge auth_status={auth_status} color="pink" link={links.instagram} red_social="Instagram" icon={<Instagram color="white" />} /> }
				{links?.twitter && <LinkBadge auth_status={auth_status} color="slate" link={links.twitter} red_social="X/Twitter" icon={<Twitter color="white" />} />}
				{links?.portfolio_cv && <LinkBadge auth_status={auth_status} color="red" link={links.portfolio_cv} red_social="Portfolio/CV" icon={<BriefcaseBusiness color="white" />} />}
				{links?.linkedin && <LinkBadge auth_status={auth_status} color="green" link={links.portfolio_cv} red_social="LinkedIn" icon={<BriefcaseBusiness color="white" />} />}
				{auth_status === "authenticated" && id !== "" ? <AddLink id={id} /> : null}
			</div>
		</section>
	)
}
