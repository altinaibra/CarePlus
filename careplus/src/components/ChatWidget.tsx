import React, { useState } from "react";

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, `You: ${input}`]);
    setInput("");
    // Këtu mund të integroni API ose WebSocket për mesazhe reale
  };

  return (
    <div className="fixed bottom-4 right-4 w-80">
      <div className="flex justify-end mb-2">
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Close Chat" : "Chat"}
        </button>
      </div>

      {isOpen && (
        <div className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] bg-white dark:[background-color:oklch(20.5%_0_0)] p-8 w-full max-w-lg mx-auto mt-16 rounded-lg shadow-md text-gray-900 dark:text-gray-100 shadow-lg rounded-lg flex flex-col h-96 ">
          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-sm">No messages yet</p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="text-sm text-gray-800 dark:text-gray-200"
                >
                  {msg}
                </div>
              ))
            )}
          </div>
          <div className="flex p-2 border-t border-gray-300 dark:border-gray-700">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded px-2 py-1 mr-2 text-sm dark:bg-gray-700 dark:text-white"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
