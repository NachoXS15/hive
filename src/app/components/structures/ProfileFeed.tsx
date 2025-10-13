import { DocType, PostType } from "../../utils/definitions";
import DocProfile from "../ui/DocProfile";
import Post from "./Post";

type Props = {
    posts?: PostType[] | undefined | null
    auth_status?: string | undefined
    docs?: DocType[] | undefined | null
}

export default async function ProfileFeed({ posts, auth_status, docs }: Props) {


    return (
        <>
            
        </>
    )
}