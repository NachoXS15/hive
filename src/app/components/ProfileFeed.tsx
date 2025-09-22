import Post from "./Post";

export default function ProfileFeed() {
    return (
        <section className="md:px-10 w-full mt-10 shadow-xl rounded-lg px-5 2xl:w-3/6 xl:w-10/12 md:w-3/4 h-fit bg-amber-50">
            <h2 className="font-bold mt-5 font-second text-xl">Mis Publicaciones</h2>
            <div className="pt-5 pb-10 flex flex-col gap-5">
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </section>
    )
}
