// app/dashboard/page.tsx
"use client";
import { useAuthStore } from "@/lib/stores/authStore";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <nav className="space-y-2">
          <a href="#" className="block py-2 px-3 rounded hover:bg-gray-700">
            Home
          </a>
          <a href="#" className="block py-2 px-3 rounded hover:bg-gray-700">
            Profile
          </a>
          <a href="#" className="block py-2 px-3 rounded hover:bg-gray-700">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
        <p>This is your main dashboard area.</p>
        {/* Additional content can be added here */}
      </main>
    </div>
  );
}
