'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { deleteDoc, deletePost } from "./data-server";

// Devuelve el usuario autenticado (validado contra Supabase) o null.
async function getAuthUser() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return { supabase, user };
}

// ¿El usuario logueado tiene rol admin en la tabla profiles?
async function isCurrentUserAdmin(): Promise<boolean> {
    const { supabase, user } = await getAuthUser();
    if (!user) return false;
    const { data } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
    return data?.role === "admin";
}

// Eliminar un post (y su documento adjunto, si tiene).
// Solo el dueño del post o un admin pueden hacerlo.
export async function deletePostAction(postId: string) {
    const { supabase, user } = await getAuthUser();
    if (!user) redirect("/auth/login");

    const { data: post } = await supabase
        .from("posts")
        .select("id, user_id")
        .eq("id", postId)
        .maybeSingle();
    if (!post) return;

    const isOwner = post.user_id === user.id;
    if (!isOwner && !(await isCurrentUserAdmin())) {
        console.error("deletePostAction: el usuario no tiene permiso sobre este post");
        return;
    }

    // Primero los documentos (dependen del post), después el post
    const { data: docs } = await supabase
        .from("documents")
        .select("id, file_path")
        .eq("post_id", postId);
    for (const doc of docs ?? []) {
        await deleteDoc([doc.file_path], doc.id);
    }
    await deletePost(postId);

    revalidatePath("/my-profile/posts");
    revalidatePath("/my-profile/docs");
    revalidatePath("/home");
    revalidatePath(`/admin/user/${post.user_id}/content/posts`);
}

// Cerrar sesión (tiene que ser una Server Action para poder borrar las cookies)
export async function logoutAction() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath("/", "layout");
    redirect("/auth/login");
}
