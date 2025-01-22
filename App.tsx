import React, { useState } from "react";
import { StatusBadge } from "./components/tickets/StatusBadge";
import { ChatInterface } from "./components/tickets/ChatInterface";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import {
  MessageCircle,
  Plus,
  Phone,
  Mail,
  MoreHorizontal,
  Users,
} from "lucide-react";

function TicketSystem() {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [tickets] = useState([
    {
      id: "1",
      title: "Issue with login",
      status: "open" as const,
    },
    {
      id: "2",
      title: "Can't upload files",
      status: "closed" as const,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Super Duper Ticket System
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-2">Create New Ticket</h2>
            <p className="text-sm text-gray-600 mb-4">
              Describe your issue and we'll help you out!
            </p>
            <div className="flex gap-2">
              <input
                placeholder="Enter ticket title"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Plus className="w-4 h-4 mr-2" />
                Create
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-2">Your Tickets</h2>
            <p className="text-sm text-gray-600 mb-4">
              Click on a ticket to start chatting
            </p>
            <div className="space-y-2">
              {tickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket.title)}
                  className={`
                    w-full text-left p-3 rounded-lg border transition-colors
                    hover:border-blue-500 hover:bg-blue-50
                    flex items-center justify-between
                    ${selectedTicket === ticket.title ? "border-blue-500 bg-blue-50" : "border-gray-200"}
                  `}
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">{ticket.title}</span>
                  </div>
                  <StatusBadge status={ticket.status} />
                </button>
              ))}
            </div>
          </div>
        </div>
        {selectedTicket && <ChatInterface ticketTitle={selectedTicket} />}
      </div>
    </div>
  );
}

export function App() {
  return <TicketSystem />;
}
