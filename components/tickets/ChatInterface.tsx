import React, { useState } from "react";
import { Send } from "lucide-react";
interface ChatInterfaceProps {
  ticketTitle: string;
}
export const ChatInterface = ({ ticketTitle }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Chat with Agent</h2>
        <p className="text-sm text-gray-600">Ticket: {ticketTitle}</p>
      </div>
      <div className="space-y-4 mb-4">
        <div className="flex items-start gap-2">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 font-medium">A</span>
          </div>
          <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
            <p className="text-sm">
              Hello! How can I help you with "{ticketTitle}"?
            </p>
          </div>
        </div>
      </div>
      <div className="relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
          className="w-full px-4 py-3 text-sm border rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
        <button className="absolute right-2 bottom-2 p-2 text-gray-600 hover:text-blue-600">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
