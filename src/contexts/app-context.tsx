"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { Parcel, Agent, DashboardStats, AppContextType } from "@/lib/types"
import { mockParcels, mockAgents, mockDashboardStats } from "@/lib/mock-data"

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [parcels, setParcels] = useState<Parcel[]>(mockParcels)
  const [agents, setAgents] = useState<Agent[]>(mockAgents)
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>(mockDashboardStats)

  const updateParcelStatus = (parcelId: string, status: Parcel["status"]) => {
    setParcels((prev) =>
      prev.map((parcel) =>
        parcel.id === parcelId ? { ...parcel, status, updatedAt: new Date().toISOString() } : parcel,
      ),
    )
  }

  const toggleAgentStatus = (agentId: string) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId ? { ...agent, status: agent.status === "active" ? "inactive" : "active" } : agent,
      ),
    )
  }

  const refreshData = () => {
    // Simulate data refresh
    setDashboardStats({
      ...mockDashboardStats,
      totalParcelsToday: Math.floor(Math.random() * 50) + 20,
    })
  }

  return (
    <AppContext.Provider
      value={{
        parcels,
        agents,
        dashboardStats,
        updateParcelStatus,
        toggleAgentStatus,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
