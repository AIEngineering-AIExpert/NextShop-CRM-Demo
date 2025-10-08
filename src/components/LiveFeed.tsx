"use client";

import { useEffect, useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import { Activity, DollarSign, UserPlus } from "lucide-react";

type EventType = "sale" | "client" | "churn" | "renewal";

type FeedEvent = {
  id: number;
  type: EventType;
  text: string;
};

const mockEvents: readonly FeedEvent[] = [
  { id: 1, type: "sale", text: "New sale: iPhone 15 Pro Max - $1,099" },
  { id: 2, type: "client", text: "New client signed up: Alice Johnson" },
  { id: 3, type: "sale", text: "Apple Watch S9 - $799" },
  { id: 4, type: "renewal", text: "Subscription renewed: Brian Lee" },
  { id: 5, type: "churn", text: "Customer David Smith downgraded to trial" },
] as const;

export default function LiveFeed() {
  const [feed, setFeed] = useState<FeedEvent[]>(() => mockEvents.slice(0, 3));

  useEffect(() => {
    const interval = setInterval(() => {
      const next =
        mockEvents[Math.floor(Math.random() * mockEvents.length)];
      setFeed((prev) => [next, ...prev.slice(0, 4)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const iconMap = useMemo(
    () => ({
      sale: <DollarSign className="w-4 h-4" style={{ color: "var(--accent-green)" }} />,
      client: <UserPlus className="w-4 h-4" style={{ color: "var(--accent-blue)" }} />,
      churn: <Activity className="w-4 h-4" style={{ color: "#f87171" }} />,
      renewal: <Activity className="w-4 h-4" style={{ color: "#facc15" }} />,
    }),
    [],
  );

  return (
    <Card className="mt-10">
      <h2
        className="text-lg font-semibold mb-4"
        style={{ color: "var(--accent-green)" }}
      >
        Live Sales Feed
      </h2>
      <ul className="space-y-3 text-sm text-secondary">
        {feed.map((event, index) => (
          <li
            key={`${event.id}-${index}`}
            className="flex items-center gap-2 animate-fade-in"
          >
            {iconMap[event.type] ?? (
              <Activity className="w-4 h-4 text-secondary" />
            )}
            <span>{event.text}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
