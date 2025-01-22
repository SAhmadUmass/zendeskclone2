'use client'

import { useState, useEffect } from 'react'
import { StatusBadge } from '../../../components/tickets/StatusBadge'
import { ChatInterface } from '../../../components/tickets/ChatInterface'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'
import { Plus, MessageCircle } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

interface Request {
  id: string
  title: string
  status: string
  created_at: string
  customer_id: string
  description: string
  priority: 'low' | 'medium' | 'high'
}

export default function TicketsPage() {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)
  const [requests, setRequests] = useState<Request[]>([])
  const [newRequestTitle, setNewRequestTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single()

    if (!profile) return

    const { data: requests } = await supabase
      .from('requests')
      .select('*')
      .eq('customer_id', profile.id)
      .order('created_at', { ascending: false })

    if (requests) {
      setRequests(requests)
    }
  }

  const createRequest = async () => {
    if (!newRequestTitle.trim()) return

    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single()

    if (!profile) return

    const { error } = await supabase
      .from('requests')
      .insert([
        {
          title: newRequestTitle,
          description: newRequestTitle, // Using title as description for now
          status: 'new',
          customer_id: profile.id,
          priority: 'medium'
        }
      ])

    if (!error) {
      setNewRequestTitle('')
      fetchRequests()
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Support Requests
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-2">Create New Request</h2>
            <p className="text-sm text-gray-600 mb-4">
              Describe your issue and we'll help you out!
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter request title"
                className="flex-1"
                value={newRequestTitle}
                onChange={(e) => setNewRequestTitle(e.target.value)}
              />
              <Button 
                className="!w-auto px-4 flex items-center gap-2"
                onClick={createRequest}
                isLoading={loading}
              >
                <Plus className="w-4 h-4" />
                Create
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-2">Your Requests</h2>
            <p className="text-sm text-gray-600 mb-4">
              Click on a request to start chatting
            </p>
            <div className="space-y-2">
              {requests.map((request) => (
                <button
                  key={request.id}
                  onClick={() => setSelectedRequest(request.title)}
                  className={`
                    w-full text-left p-3 rounded-lg border transition-colors
                    hover:border-blue-500 hover:bg-blue-50
                    flex items-center justify-between
                    ${selectedRequest === request.title ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                  `}
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">{request.title}</span>
                  </div>
                  <StatusBadge status={request.status === 'new' ? 'open' : 'closed'} />
                </button>
              ))}
              {requests.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No requests yet. Create one to get started!
                </p>
              )}
            </div>
          </div>
        </div>
        
        {selectedRequest && <ChatInterface ticketTitle={selectedRequest} />}
      </div>
    </div>
  )
} 