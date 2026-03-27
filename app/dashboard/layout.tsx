"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProtectedRoute } from "@/components/protected-route"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <div className="lg:pl-64">
          <DashboardHeader />
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
