import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import { ProtectedRoute } from "@/components/protected-route";
import { Sidebar } from "@/components/sidebar";
import LoginPage from "@/pages/login/page";

const DashboardPage = lazy(() => import("@/pages/dashboard/page"));
const AgentsPage = lazy(() => import("@/pages/agents/page"));
const ParcelsPage = lazy(() => import("@/pages/parcels/page"));
const ReportsPage = lazy(() => import("@/pages/reports/page"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="agents" element={<AgentsPage />} />
            <Route path="parcels" element={<ParcelsPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

const Layout = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default App;