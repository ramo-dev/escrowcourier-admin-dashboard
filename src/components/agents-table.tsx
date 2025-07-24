"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useApp } from "@/contexts/app-context"
import { Star, Phone, MapPin } from "lucide-react"
import { format } from "date-fns"

export function AgentsTable() {
  const { agents, toggleAgentStatus } = useApp()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search agents by name or location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Parcels Handled</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell className="font-medium">{agent.name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                    {agent.location}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-1 text-gray-500" />
                    {agent.phone}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={agent.status === "active" ? "success" : "secondary"}>
                    {agent.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{agent.parcelsHandled}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                    {agent.rating}
                  </div>
                </TableCell>
                <TableCell>{format(new Date(agent.joinedAt), "MMM dd, yyyy")}</TableCell>
                <TableCell>
                  <Button
                    variant={agent.status === "active" ? "destructive" : "default"}
                    size="sm"
                    onClick={() => toggleAgentStatus(agent.id)}
                  >
                    {agent.status === "active" ? "Deactivate" : "Activate"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
