"use client";

import { useEffect, useRef, useState } from "react";
import Card from "@/components/ui/Card";
import {
  AlertCircle,
  Bot,
  Lightbulb,
  Send,
  TrendingUp,
} from "lucide-react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const initialMessages: readonly Message[] = [
  {
    sender: "bot",
    text: "Hi! I can help you analyze sales and suggest strategies.",
  },
  {
    sender: "bot",
    text: "Ask me about top products, churn risks, or new opportunities.",
  },
] as const;

const quickActions = [
  {
    icon: <TrendingUp size={16} />,
    label: "Sales Forecast",
    text: "Show sales forecast",
  },
  {
    icon: <AlertCircle size={16} />,
    label: "Churn Risk",
    text: "Analyze churn risk",
  },
  {
    icon: <Lightbulb size={16} />,
    label: "Suggest Upsell",
    text: "Suggest upsell ideas",
  },
] as const;

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(() => [
    ...initialMessages,
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (msg: string) => {
    if (!msg.trim()) return;
    const newMsg: Message = { sender: "user", text: msg };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    setTimeout(() => {
      const normalized = msg.toLowerCase();
      const reply: Message =
        normalized.includes("churn")
          ? {
              sender: "bot",
              text:
                "Customer churn is up 1%. Suggest targeting trial users with personalized discounts.",
            }
          : normalized.includes("sales")
          ? {
              sender: "bot",
              text:
                "Sales grew 12% last week. iPhone 15 Pro Max leads revenue with strong upsell potential.",
            }
          : {
              sender: "bot",
              text:
                "Got it! You can also generate a quick report or forecast using the shortcuts below.",
            };
      setMessages((prev) => [...prev, reply]);
    }, 800);
  };

  return (
    <Card className="mt-10">
      <h2
        className="text-lg font-semibold mb-4 flex items-center gap-2"
        style={{ color: "var(--accent-green)" }}
      >
        <Bot style={{ color: "var(--accent-green)" }} /> AI Sales Assistant
      </h2>

      <div className="h-72 overflow-y-auto space-y-3 mb-4 pr-2 custom-scroll">
        {messages.map((message, index) => (
          <div
            key={`${message.sender}-${index}`}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-2xl max-w-[80%] text-sm ${
                message.sender === "user"
                  ? "bg-[rgba(34,201,151,0.2)] text-[var(--accent-green)]"
                  : "bg-[rgba(32,32,32,0.8)] text-primary"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask the assistant..."
          className="flex-1 bg-[rgba(24,24,24,0.75)] text-primary text-sm px-3 py-2 rounded-lg outline-none border border-[rgba(44,44,44,0.9)] focus:border-[var(--accent-green)]"
          onKeyDown={(event) =>
            event.key === "Enter" ? sendMessage(input) : undefined
          }
        />
        <button
          onClick={() => sendMessage(input)}
          className="rounded-lg p-2 transition"
          style={{
            backgroundColor: "rgba(34,201,151,0.18)",
            color: "var(--accent-green)",
          }}
        >
          <Send size={16} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => sendMessage(action.text)}
            className="flex items-center gap-1 text-xs rounded-md px-2 py-1 transition"
            style={{
              backgroundColor: "rgba(32,32,32,0.7)",
              color: "var(--text-secondary)",
            }}
          >
            {action.icon} {action.label}
          </button>
        ))}
      </div>
    </Card>
  );
}
