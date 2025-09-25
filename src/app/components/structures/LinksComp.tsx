import LinkBadge from "../ui/LinkBadge";
import { LinksProfileType } from "@/app/utils/definitions";

type Props = {
	links: LinksProfileType | undefined
}

export default function LinksComp({links}: Props) {
	return (
		<section className="mt-5">
			<h2 className="font-bold text-xl font-second">Mis enlaces</h2>
			<div>
				{links?.facebook ? <LinkBadge />: null}
				{links?.instagram ? <LinkBadge />: null}
				{links?.twitter ? <LinkBadge />: null}
				{links?.portfolio ? <LinkBadge />: null}
				
			</div>
		</section>
	)
}
