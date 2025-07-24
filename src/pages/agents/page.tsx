"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Sidebar } from "@/components/sidebar"
import { AgentsTable } from "@/components/agents-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function AgentsPage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 relative">
            <div className="mb-8 sticky py-6 top-0 bg-background">
              <h1 className="text-3xl font-bold  flex items-center">
                <Users className="h-8 w-8 mr-3" />
                Agents Management
              </h1>
              <p >Manage pickup agents and their activities</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Agents</CardTitle>
                <CardDescription>View agent details, performance, and manage their status</CardDescription>
              </CardHeader>
              <CardContent>
                <AgentsTable />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
