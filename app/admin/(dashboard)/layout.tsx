import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      {/* mt-14 md:mt-0: offset for mobile fixed top bar; desktop sidebar is in normal flow */}
      <main className="flex-1 mt-14 md:mt-0 p-4 md:p-8 lg:p-10 min-w-0">
        {children}
      </main>
    </div>
  );
}
