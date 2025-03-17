"use client";

import { useState } from "react";
import UserDashboardSidebar from "@/components/user/UserDashboardSidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:flex md:flex-shrink-0">
        <UserDashboardSidebar />
      </div>
      <div className="md:hidden">
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" onClick={() => setSidebarOpen(false)}></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <UserDashboardSidebar onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="md:hidden bg-white p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button onClick={() => setSidebarOpen(true)} className="text-gray-500">
            <Menu size={24} />
          </button>
        </div>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}