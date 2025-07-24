"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useApp } from "@/contexts/app-context"
import type { Parcel } from "@/lib/types"
import { format } from "date-fns"

export function ParcelsTable() {
  const { parcels, updateParcelStatus } = useApp()
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredParcels = parcels.filter((parcel) => {
    const matchesStatus = statusFilter === "all" || parcel.status === statusFilter
    const matchesSearch =
      parcel.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.receiver.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusBadge = (status: Parcel["status"]) => {
    const variants = {
      pending: "secondary",
      "in-transit": "default",
      delivered: "success",
      failed: "destructive",
    } as const

    return <Badge variant={variants[status] || "secondary"}>{status.replace("-", " ").toUpperCase()}</Badge>
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search parcels..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="max-w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-transit">In Transit</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parcel ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Receiver</TableHead>
              <TableHead>Pickup Agent</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParcels.map((parcel) => (
              <TableRow key={parcel.id}>
                <TableCell className="font-medium">{parcel.id}</TableCell>
                <TableCell>{getStatusBadge(parcel.status)}</TableCell>
                <TableCell>{parcel.sender}</TableCell>
                <TableCell>{parcel.receiver}</TableCell>
                <TableCell>{parcel.pickupAgent}</TableCell>
                <TableCell>{format(new Date(parcel.createdAt), "MMM dd, yyyy")}</TableCell>
                <TableCell>
                  <Select
                    value={parcel.status}
                    onValueChange={(value) => updateParcelStatus(parcel.id, value as Parcel["status"])}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-transit">In Transit</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
