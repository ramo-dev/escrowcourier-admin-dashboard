export interface User {
  id: string
  email: string
  name: string
  role: string
}

export interface Parcel {
  id: string
  status: "in-transit" | "delivered" | "failed" | "pending"
  sender: string
  receiver: string
  pickupAgent: string
  createdAt: string
  updatedAt: string
  description: string
  value: number
}

export interface Agent {
  id: string
  name: string
  location: string
  phone: string
  status: "active" | "inactive"
  parcelsHandled: number
  rating: number
  joinedAt: string
}

export interface DashboardStats {
  totalParcelsToday: number
  pendingDeliveries: number
  activeAgents: number
  totalRevenue: number
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

export interface AppContextType {
  parcels: Parcel[]
  agents: Agent[]
  dashboardStats: DashboardStats
  updateParcelStatus: (parcelId: string, status: Parcel["status"]) => void
  toggleAgentStatus: (agentId: string) => void
  refreshData: () => void
}
