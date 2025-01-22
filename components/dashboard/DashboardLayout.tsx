import React from "react";
import {
  Users,
  TicketIcon,
  BarChart3,
  Settings,
  Search,
  Bell,
} from "lucide-react";
interface DashboardLayoutProps {
  children: React.ReactNode;
}
export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900">Support Desk</h1>
        </div>
        <nav className="px-4 space-y-1">
          {[
            {
              icon: Users,
              label: "Customers",
              active: true,
            },
            {
              icon: TicketIcon,
              label: "Tickets",
            },
            {
              icon: BarChart3,
              label: "Analytics",
            },
            {
              icon: Settings,
              label: "Settings",
            },
          ].map((item) => (
            <button
              key={item.label}
              className={`
                w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-sm
                ${item.active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}
              `}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center bg-gray-50 rounded-lg w-96">
              <Search className="w-5 h-5 text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="Search customers..."
                className="w-full px-3 py-2 bg-transparent border-0 focus:outline-none focus:ring-0"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </header>
        {/* Page content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};
