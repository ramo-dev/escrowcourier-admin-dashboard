"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useApp } from "@/contexts/app-context"
import { FileText, Download, BarChart3 } from "lucide-react"

export default function ReportsPage() {
  const { parcels, agents, dashboardStats } = useApp()

  const generateCSVReport = () => {
    const csvContent = [
      ["Parcel ID", "Status", "Sender", "Receiver", "Agent", "Created", "Value"],
      ...parcels.map((parcel) => [
        parcel.id,
        parcel.status,
        parcel.sender,
        parcel.receiver,
        parcel.pickupAgent,
        new Date(parcel.createdAt).toLocaleDateString(),
        parcel.value,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `parcels-report-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const deliveryStats = {
    delivered: parcels.filter((p) => p.status === "delivered").length,
    inTransit: parcels.filter((p) => p.status === "in-transit").length,
    pending: parcels.filter((p) => p.status === "pending").length,
    failed: parcels.filter((p) => p.status === "failed").length,
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen  bg-background">
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 relative">
            <div className="mb-8 sticky top-0 py-6 bg-background">
              <h1 className="text-3xl font-bold  flex items-center">
                <FileText className="h-8 w-8 mr-3" />
                Reports & Analytics
              </h1>
              <p >Generate reports and view performance metrics</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Delivery Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Delivered:</span>
                      <span className="font-semibold text-green-600">{deliveryStats.delivered}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>In Transit:</span>
                      <span className="font-semibold text-blue-600">{deliveryStats.inTransit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending:</span>
                      <span className="font-semibold text-yellow-600">{deliveryStats.pending}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Failed:</span>
                      <span className="font-semibold text-red-600">{deliveryStats.failed}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Agent Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Agents:</span>
                      <span className="font-semibold">{agents.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active:</span>
                      <span className="font-semibold text-green-600">
                        {agents.filter((a) => a.status === "active").length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Rating:</span>
                      <span className="font-semibold">
                        {(agents.reduce((sum, agent) => sum + agent.rating, 0) / agents.length).toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Handled:</span>
                      <span className="font-semibold">
                        {agents.reduce((sum, agent) => sum + agent.parcelsHandled, 0)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Today's Revenue:</span>
                      <span className="font-semibold">KSh {dashboardStats.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg per Parcel:</span>
                      <span className="font-semibold">
                        KSh {Math.round(parcels.reduce((sum, p) => sum + p.value, 0) / parcels.length).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Value:</span>
                      <span className="font-semibold">
                        KSh {parcels.reduce((sum, p) => sum + p.value, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Export Reports</CardTitle>
                <CardDescription>Download detailed reports for further analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={generateCSVReport} className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Export Parcels CSV
                  </Button>
                  <Button variant="outline" className="flex items-center bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Export Agents Report
                  </Button>
                  <Button variant="outline" className="flex items-center bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Export Financial Summary
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="text-center p-4 border shadow rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">
                      {Math.round((deliveryStats.delivered / parcels.length) * 100)}%
                    </p>
                    <p className="text-sm text-gray-600">Success Rate</p>
                  </div>
                  <div className="text-center p-4 border shadow rounded-lg">
                    <p className="text-3xl font-bold text-green-600">
                      {Math.round((deliveryStats.inTransit / parcels.length) * 100)}%
                    </p>
                    <p className="text-sm text-gray-600">In Transit</p>
                  </div>
                  <div className="text-center p-4 border shadow rounded-lg">
                    <p className="text-3xl font-bold text-yellow-600">
                      {Math.round((deliveryStats.pending / parcels.length) * 100)}%
                    </p>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                  <div className="text-center p-4 border shadow rounded-lg">
                    <p className="text-3xl font-bold text-red-600">
                      {Math.round((deliveryStats.failed / parcels.length) * 100)}%
                    </p>
                    <p className="text-sm text-gray-600">Failed</p>
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
