"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useApp } from "@/contexts/app-context"
import { Package, Clock, Users, DollarSign } from "lucide-react"

export function DashboardStats() {
  const { dashboardStats } = useApp()

  const stats = [
    {
      title: "Total Parcels Today",
      value: dashboardStats.totalParcelsToday,
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Pending Deliveries",
      value: dashboardStats.pendingDeliveries,
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Active Agents",
      value: dashboardStats.activeAgents,
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Total Revenue",
      value: `KSh ${dashboardStats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
