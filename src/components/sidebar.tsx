"use client"

import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { LayoutDashboard, Package, Users, FileText, LogOut, Truck, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Parcels", href: "/parcels", icon: Package },
  { name: "Agents", href: "/agents", icon: Users },
  { name: "Reports", href: "/reports", icon: FileText },
]

export function Sidebar() {
  const location = useLocation()
  const { logout, user } = useAuth();
  const {theme, setTheme} = useTheme();

  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center space-x-2">
          <Truck className="h-8 w-8 " />
          <span className="text-xl font-bold ">Escrow Courier</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive ? "bg-gray-800 text-white" : " dark:hover:bg-gray-700 hover:bg-gray-500",
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>


      <div className="border-t p-4">
 <div className="mb-4">
          <Button
            onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")}
            variant="ghost"
            className="w-full justify-start  hover:bg-gray-500 dark:hover:bg-gray-800"
          >
            {theme === "light" ? (
              <>
                <Moon className="mr-2 h-4 w-4" />
                Dark Mode
              </>
            ) : (
              <>
                <Sun className="mr-2 h-4 w-4" />
                Light Mode
              </>
            )}
          </Button>
        </div>
        <div className="flex items-center space-x-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-sm font-medium ">{user?.name?.charAt(0) || "A"}</span>
          </div>
          <div>
            <p className="text-sm font-medium ">{user?.name}</p>
            <p className="text-xs ">{user?.email}</p>
          </div>
        </div>
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start dark:hover:bg-gray-500 hover:bg-gray-700"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  )
}
