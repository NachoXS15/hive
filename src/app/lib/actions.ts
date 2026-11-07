'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { deleteDoc, deletePost, fetchNotifications } from "./data-server";
import { COMMENT_MAX_LENGTH, NotificationsData } from "../utils/definitions";

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

// Vistas donde aparece un post (con sus contadores de me gusta y comentarios)
function revalidatePostViews(postId: string) {
    revalidatePath("/home");
    revalidatePath(`/home/post/${postId}`);
    revalidatePath("/my-profile/posts");
    revalidatePath("/profile/[id]/posts", "page");
}

// Dar (liked = true) o quitar (liked = false) "me gusta" a un post.
// Es idempotente: repetir la misma acción (doble click, dos pestañas) no rompe nada.
export async function likePostAction(postId: string, liked: boolean): Promise<{ error?: string }> {
    const { supabase, user } = await getAuthUser();
    if (!user) return { error: "Tenés que iniciar sesión para dar me gusta." };

    if (liked) {
        const { error } = await supabase
            .from("post_likes")
            .insert({ post_id: postId, user_id: user.id });
        // 23505 = ya tenía me gusta: el resultado es el mismo
        if (error && error.code !== "23505") {
            console.error("likePostAction:", error.message);
            return { error: "No se pudo registrar el me gusta." };
        }
    } else {
        const { error } = await supabase
            .from("post_likes")
            .delete()
            .eq("post_id", postId)
            .eq("user_id", user.id);
        if (error) {
            console.error("likePostAction:", error.message);
            return { error: "No se pudo quitar el me gusta." };
        }
    }

    revalidatePostViews(postId);
    return {};
}

// Estado del formulario de comentarios. Si falla, se devuelve el texto
// para que el usuario no lo pierda.
export type CommentFormState = { error?: string; body?: string };

// Publicar un comentario en un post
export async function addCommentAction(
    postId: string,
    _prevState: CommentFormState,
    formData: FormData
): Promise<CommentFormState> {
    const { supabase, user } = await getAuthUser();
    const body = formData.get("body")?.toString().trim() ?? "";
    if (!user) return { error: "Tenés que iniciar sesión para comentar.", body };
    if (body.length === 0) return { error: "El comentario está vacío." };
    if (body.length > COMMENT_MAX_LENGTH) {
        return { error: `El comentario puede tener hasta ${COMMENT_MAX_LENGTH} caracteres.`, body };
    }

    const { error } = await supabase
        .from("post_comments")
        .insert({ post_id: postId, user_id: user.id, body });
    if (error) {
        console.error("addCommentAction:", error.message);
        return { error: "No se pudo publicar el comentario. Probá de nuevo.", body };
    }

    revalidatePostViews(postId);
    return {};
}

// Eliminar un comentario. Pueden hacerlo su autor, el dueño del post o un admin.
export async function deleteCommentAction(commentId: string) {
    const { supabase, user } = await getAuthUser();
    if (!user) redirect("/auth/login");

    const { data: comment } = await supabase
        .from("post_comments")
        .select("id, user_id, post_id, posts ( user_id )")
        .eq("id", commentId)
        .maybeSingle();
    if (!comment) return;

    const post = comment.posts as unknown as { user_id: string } | null;
    const canDelete =
        comment.user_id === user.id ||
        post?.user_id === user.id ||
        (await isCurrentUserAdmin());
    if (!canDelete) {
        console.error("deleteCommentAction: el usuario no tiene permiso sobre este comentario");
        return;
    }

    const { error } = await supabase.from("post_comments").delete().eq("id", commentId);
    if (error) {
        console.error("deleteCommentAction:", error.message);
        return;
    }

    revalidatePostViews(comment.post_id as string);
}

// Notificaciones del usuario logueado (las usa la campana para actualizarse)
export async function fetchMyNotificationsAction(): Promise<NotificationsData> {
    const { user } = await getAuthUser();
    if (!user) return { notifications: [], unreadCount: 0 };
    return fetchNotifications(user.id);
}

// Marcar una notificación como leída (solo si es del usuario logueado)
export async function markNotificationReadAction(notificationId: string) {
    const { supabase, user } = await getAuthUser();
    if (!user) return;
    const { error } = await supabase
        .from("notifications")
        .update({ read_at: new Date().toISOString() })
        .eq("id", notificationId)
        .eq("recipient_id", user.id)
        .is("read_at", null);
    if (error) console.error("markNotificationReadAction:", error.message);
}

// Marcar todas las notificaciones del usuario logueado como leídas
export async function markAllNotificationsReadAction() {
    const { supabase, user } = await getAuthUser();
    if (!user) return;
    const { error } = await supabase
        .from("notifications")
        .update({ read_at: new Date().toISOString() })
        .eq("recipient_id", user.id)
        .is("read_at", null);
    if (error) console.error("markAllNotificationsReadAction:", error.message);
}

// Cerrar sesión (tiene que ser una Server Action para poder borrar las cookies)
export async function logoutAction() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath("/", "layout");
    redirect("/auth/login");
}
