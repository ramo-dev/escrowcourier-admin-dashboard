"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Sidebar } from "@/components/sidebar"
import { DashboardStats } from "@/components/dashboard-stats"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useApp } from "@/contexts/app-context"
import { RefreshCw, TrendingUp, Package, Users } from "lucide-react"

export default function DashboardPage() {
  const { refreshData, parcels, agents } = useApp()

  const recentParcels = parcels.slice(0, 5)
  const recentAgents = agents.filter((agent) => agent.status === "active").slice(0, 3)

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 relative">
            <div className="flex sticky py-6 top-0 bg-background justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold ">Dashboard</h1>
                <p >Welcome to your admin portal</p>
              </div>
              <Button onClick={refreshData} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            </div>

            <DashboardStats />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Recent Parcels
                  </CardTitle>
                  <CardDescription>Latest parcel activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentParcels.map((parcel) => (
                      <div key={parcel.id} className="flex items-center justify-between p-3  rounded-lg">
                        <div>
                          <p className="font-medium">{parcel.id}</p>
                          <p className="text-sm text-gray-600">
                            {parcel.sender} → {parcel.receiver}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium capitalize">{parcel.status.replace("-", " ")}</p>
                          <p className="text-xs text-gray-500">{parcel.pickupAgent}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Active Agents
                  </CardTitle>
                  <CardDescription>Top performing agents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAgents.map((agent) => (
                      <div key={agent.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <p className="text-sm text-gray-600">{agent.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{agent.parcelsHandled}</p>
                          <p className="text-xs text-gray-500">parcels</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Quick Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 border shadow rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {Math.round((parcels.filter((p) => p.status === "delivered").length / parcels.length) * 100)}%
                    </p>
                    <p className="text-sm text-gray-600">Delivery Success Rate</p>
                  </div>
                  <div className="text-center p-4 border shadow rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {agents.filter((a) => a.status === "active").length}
                    </p>
                    <p className="text-sm text-gray-600">Active Agents</p>
                  </div>
                  <div className="text-center p-4 border shadow rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">
                      {parcels.filter((p) => p.status === "in-transit").length}
                    </p>
                    <p className="text-sm text-gray-600">In Transit</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
