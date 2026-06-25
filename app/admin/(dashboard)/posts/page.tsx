import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getAllPostsAdmin } from "@/lib/admin-data";
import { DeletePostButton } from "@/components/admin/DeletePostButton";

export default async function AdminPostsPage() {
  const posts = await getAllPostsAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-brand-900">Posts</h1>
          <p className="mt-1 text-sm text-brand-400">{posts.length} total.</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-full bg-brand text-white font-medium px-5 py-2.5 text-sm shadow-soft hover:bg-brand-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      <div className="mt-8 bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-brand-50 text-left text-brand-400">
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-brand-50 last:border-0">
                <td className="px-5 py-3">
                  <div className="font-medium text-brand-900">{post.title}</div>
                  <div className="text-brand-300 text-xs">/blog/{post.slug}</div>
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      post.published ? "bg-emerald-50 text-emerald-600" : "bg-brand-50 text-brand-400"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-3 text-brand-400 whitespace-nowrap">
                  {post.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-brand-400 hover:text-brand-700"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeletePostButton id={post.id} title={post.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-brand-300">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
