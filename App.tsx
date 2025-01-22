import React, { useState } from "react";
import { MemoryRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthLayout } from "./components/AuthLayout";
import { Input } from "./components/ui/Input";
import { Button } from "./components/ui/Button";
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
function SignIn() {
  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Welcome back! Please enter your details."
    >
      <form className="mt-8 space-y-6">
        <Input
          label="Email address"
          type="email"
          required
          autoComplete="email"
        />
        <Input
          label="Password"
          type="password"
          required
          autoComplete="current-password"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Forgot your password?
          </Link>
        </div>
        <Button type="submit">Sign in</Button>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
function SignUp() {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Start your journey with us today."
    >
      <form className="mt-8 space-y-6">
        <Input label="Full name" type="text" required autoComplete="name" />
        <Input
          label="Email address"
          type="email"
          required
          autoComplete="email"
        />
        <Input
          label="Password"
          type="password"
          required
          autoComplete="new-password"
        />
        <Button type="submit">Create account</Button>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
function ForgotPassword() {
  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="No worries, we'll send you reset instructions."
    >
      <form className="mt-8 space-y-6">
        <Input
          label="Email address"
          type="email"
          required
          autoComplete="email"
        />
        <Button type="submit">Send reset instructions</Button>
        <p className="text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            to="/"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Back to sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
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
              <Input
                label=""
                placeholder="Enter ticket title"
                className="flex-1"
              />
              <Button className="!w-auto px-4 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create
              </Button>
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
function Dashboard() {
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "Total Customers",
              value: "1,234",
              icon: Users,
              color: "blue",
            },
            {
              label: "Active Tickets",
              value: "23",
              icon: MessageCircle,
              color: "green",
            },
            {
              label: "Avg. Response Time",
              value: "2.3h",
              icon: MessageCircle,
              color: "yellow",
            },
            {
              label: "Customer Satisfaction",
              value: "94%",
              icon: Users,
              color: "purple",
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-12 lg:col-span-8 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Customers</h2>
          </div>
          <div className="divide-y">
            {[
              {
                name: "Sarah Wilson",
                email: "sarah@example.com",
                status: "active",
              },
              {
                name: "Michael Chen",
                email: "michael@example.com",
                status: "inactive",
              },
              {
                name: "Emma Thompson",
                email: "emma@example.com",
                status: "active",
              },
            ].map((customer) => (
              <div
                key={customer.email}
                className={`p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between
                  ${selectedCustomer === customer.email ? "bg-blue-50" : ""}
                `}
                onClick={() => setSelectedCustomer(customer.email)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">
                      {customer.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-sm text-gray-600">{customer.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                {
                  type: "ticket",
                  text: "Created new support ticket",
                },
                {
                  type: "call",
                  text: "Scheduled a call",
                },
                {
                  type: "email",
                  text: "Sent follow-up email",
                },
              ].map((activity, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/tickets" element={<TicketSystem />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
