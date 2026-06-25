import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/PostForm";
import { getPostById } from "@/lib/admin-data";
import { updatePostAction } from "@/app/admin/(dashboard)/posts/actions";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  const boundAction = async (formData: FormData) => {
    "use server";
    await updatePostAction(id, formData);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-900">Edit Post</h1>
      <div className="mt-8">
        <PostForm
          action={boundAction}
          submitLabel="Save Changes"
          initialValues={{
            slug: post.slug,
            title: post.title,
            description: post.description,
            date: post.date.toISOString().slice(0, 10),
            tags: post.tags,
            content: post.content,
            published: post.published,
          }}
        />
      </div>
    </div>
  );
}
