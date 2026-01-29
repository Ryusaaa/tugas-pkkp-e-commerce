import { DashboardSidebar } from "@/components";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar is fixed/sticky on the left */}
      <DashboardSidebar />
      
      {/* Main content area */}
      <main className="flex-1 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
