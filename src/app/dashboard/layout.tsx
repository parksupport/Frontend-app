import IsAuth from "@/components/isAuth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <IsAuth>
      <div className="dashboard-layout">
        {children}
      </div>
    </IsAuth>
  );
}
