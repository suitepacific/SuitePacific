"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createPost, deletePost, updatePost } from "@/lib/admin-data";
import type { PostInput } from "@/lib/admin-data";
import { pingIndexNow } from "@/lib/indexnow";
import { requireAdmin } from "@/lib/auth";

const SITE_URL = "https://suitepacific.com";

function parsePostInput(formData: FormData): PostInput {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    date: String(formData.get("date") ?? new Date().toISOString().slice(0, 10)),
    tags: String(formData.get("tags") ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .join(","),
    content: String(formData.get("content") ?? ""),
    published: formData.get("published") === "on",
  };
}

export async function createPostAction(formData: FormData) {
  await requireAdmin();
  const input = parsePostInput(formData);
  await createPost(input);
  if (input.published) {
    await pingIndexNow([`${SITE_URL}/blog/${input.slug}`, `${SITE_URL}/blog`]);
  }
  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function updatePostAction(id: string, formData: FormData) {
  await requireAdmin();
  const input = parsePostInput(formData);
  await updatePost(id, input);
  if (input.published) {
    await pingIndexNow([`${SITE_URL}/blog/${input.slug}`, `${SITE_URL}/blog`]);
  }
  revalidatePath("/blog");
  revalidatePath(`/blog/${input.slug}`);
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function deletePostAction(id: string) {
  await requireAdmin();
  const post = await deletePost(id);
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin/posts");
}
