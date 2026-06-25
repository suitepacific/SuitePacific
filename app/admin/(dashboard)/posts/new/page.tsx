import { PostForm } from "@/components/admin/PostForm";
import { createPostAction } from "@/app/admin/(dashboard)/posts/actions";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-900">New Post</h1>
      <div className="mt-8">
        <PostForm action={createPostAction} submitLabel="Create Post" />
      </div>
    </div>
  );
}
