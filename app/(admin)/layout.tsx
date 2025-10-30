import { AdminSidebar } from "@/components/common/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F1F5F9] p-5">
      <div className="flex h-[1040px] w-[1399px] items-start gap-5">
        <AdminSidebar />
        {children}
      </div>
    </div>
  );
}
