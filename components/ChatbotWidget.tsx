"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-[400px] rounded-lg shadow-lg bg-white overflow-hidden">
          <div className="flex justify-end p-2">
            <button
              onClick={toggleChat}
              className="text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
          <iframe
            src="https://app.thinkstack.ai/bot/index.html?chatbot_id=67334193bde936bef06b2d4a"
            className="w-full border-0"
            style={{ minHeight: "500px" }}
          />
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="p-3 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
}
