"use client"

import { useState } from "react"
import { DocType, PostType } from "../../utils/definitions"
import DocProfile from "../ui/DocProfile"
import Post from "./Post"

type Props = {
    posts: PostType[] | undefined | null
    auth_status?: string | undefined
    docs: DocType[] | undefined | null
}

export default function ProfileFeedTabs({ posts, auth_status, docs }: Props) {
    const [activeTab, setActiveTab] = useState<"posts" | "docs">("posts")

    return (
        <>
            {/* Botones de solapas */}
            <div className="w-full flex items-center">
                <button
                    onClick={() => setActiveTab("posts")}
                    className={`w-1/2 font-bold text-regular xl:text-xl py-2 transition rounded-t-lg ${activeTab === "posts"
                            ? "bg-slate-600 text-white"
                            : "hover:bg-slate-400 hover:text-white"
                        }`}
                >
                    Publicaciones
                </button>
                <button
                    onClick={() => setActiveTab("docs")}
                    className={`w-1/2 font-bold text-regular xl:text-xl py-2 transition rounded-t-lg ${activeTab === "docs"
                            ? "bg-slate-600 text-white"
                            : "hover:bg-slate-400 hover:text-white"
                        }`}
                >
                    Documentos
                </button>
            </div>

            {/* Contenido dinámico */}
            {activeTab === "posts" ? (
                posts && posts.length > 0 ? (
                    posts
                        .slice()
                        .reverse()
                        .map((post, i) => (
                            <Post key={i} auth_status={auth_status} post={post} />
                        ))
                ) : (
                    <h2 className="text-center font-second font-semibold">
                        Este usuario no ha compartido nada. <br /> Esperemos se anime :D
                    </h2>
                )
            ) : docs && docs.length > 0 ? (
                docs
                    .slice()
                    .reverse()
                    .map((doc, i) => <DocProfile key={i} doc={doc}  />)
            ) : (
                <h2 className="text-center font-second font-semibold">
                    Este usuario no ha compartido documentos todavía. <br /> Esperemos se
                    anime :D
                </h2>
            )}
        </>
    )
}
