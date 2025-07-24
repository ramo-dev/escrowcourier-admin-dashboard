"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Sidebar } from "@/components/sidebar"
import { ParcelsTable } from "@/components/parcels-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package } from "lucide-react"

export default function ParcelsPage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 relative">
            <div className="mb-8 sticky py-6 top-0 bg-background">
              <h1 className="text-3xl font-bold  flex items-center">
                <Package className="h-8 w-8 mr-3" />
                Parcels Management
              </h1>
              <p >Track and manage all parcel deliveries</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Parcels</CardTitle>
                <CardDescription>View, filter, and update parcel statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <ParcelsTable />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
