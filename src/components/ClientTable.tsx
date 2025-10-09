"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Card from "@/components/ui/Card";
import {
  Mail,
  Share2,
  Users,
  DownloadCloud,
  Sparkles,
  CornerUpRight,
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line } from "recharts";
import { toast } from "sonner";

type Client = {
  id: number;
  name: string;
  email: string;
  segment: "High-Value" | "Trial" | "At-Risk";
  channel: "Email" | "Social" | "Referral";
  engagement: number;
  activity: number[];
  lastPurchase: string;
};

const clients: Client[] = [
  {
    id: 1,
    name: "Clara Ng",
    email: "clara@nextshop.com",
    segment: "High-Value",
    channel: "Email",
    engagement: 92,
    activity: [70, 75, 90, 95, 98, 94, 92],
    lastPurchase: "Oct 7, 2025",
  },
  {
    id: 2,
    name: "David Smith",
    email: "david@shop.com",
    segment: "Trial",
    channel: "Social",
    engagement: 48,
    activity: [20, 40, 55, 45, 50, 42, 48],
    lastPurchase: "Oct 3, 2025",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@proshop.com",
    segment: "At-Risk",
    channel: "Referral",
    engagement: 30,
    activity: [50, 42, 39, 30, 25, 28, 30],
    lastPurchase: "Sep 29, 2025",
  },
  {
    id: 4,
    name: "Ella Brown",
    email: "ella@ecom.ai",
    segment: "High-Value",
    channel: "Email",
    engagement: 86,
    activity: [70, 75, 78, 85, 88, 90, 86],
    lastPurchase: "Oct 6, 2025",
  },
];

const filters = ["All", "High-Value", "Trial", "At-Risk"] as const;

const getBadgeClasses = (segment: Client["segment"]) => {
  if (segment === "High-Value") return "text-green-400 bg-green-500/10";
  if (segment === "Trial") return "text-yellow-400 bg-yellow-500/10";
  return "text-red-400 bg-red-500/10";
};

function ChannelIcon({ ch }: { ch: Client["channel"] }) {
  return ch === "Email" ? (
    <Mail className="w-4 h-4 text-blue-400" />
  ) : ch === "Social" ? (
    <Share2 className="w-4 h-4 text-pink-400" />
  ) : (
    <Users className="w-4 h-4 text-purple-400" />
  );
}

function exportToCSV(rows: Client[]) {
  const headers = [
    "Name",
    "Email",
    "Segment",
    "Channel",
    "Engagement",
    "LastPurchase",
  ];
  const lines = rows.map((row) => [
    row.name,
    row.email,
    row.segment,
    row.channel,
    String(row.engagement),
    row.lastPurchase,
  ]);
  const csv = [headers, ...lines]
    .map((line) =>
      line.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "clients_export.csv";
  link.click();
  URL.revokeObjectURL(url);
}

const engagementColor = (value: number) => {
  if (value > 70) return "#22c55e";
  if (value > 40) return "#eab308";
  return "#ef4444";
};

const engagementLevel = (value: number) => {
  if (value > 70) return "High";
  if (value > 40) return "Medium";
  return "Low";
};

const quickActionForSegment = (segment: Client["segment"]) => {
  if (segment === "At-Risk") return "Retain";
  if (segment === "Trial") return "Convert";
  return "Upsell";
};

export default function ClientTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [hoverId, setHoverId] = useState<number | null>(null);

  useEffect(() => {
    const seg = searchParams.get("seg");
    if (seg && filters.includes(seg as (typeof filters)[number])) {
      setFilter(seg as (typeof filters)[number]);
    }
  }, [searchParams]);

  const handleFilterChange = (segment: (typeof filters)[number]) => {
    setFilter(segment);
    const params = new URLSearchParams(searchParams.toString());
    if (segment === "All") {
      params.delete("seg");
    } else {
      params.set("seg", segment);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const filtered = useMemo(
    () =>
      filter === "All"
        ? clients
        : clients.filter((client) => client.segment === filter),
    [filter],
  );

  const summary = useMemo(() => {
    const atRisk = filtered.filter((client) => client.segment === "At-Risk").length;
    const high = filtered.filter((client) => client.segment === "High-Value").length;
    const trial = filtered.filter((client) => client.segment === "Trial").length;
    const focus =
      atRisk > 0
        ? "At-Risk retention"
        : trial > 0
        ? "Trial conversion"
        : "High-Value upsell";
    return { atRisk, high, trial, focus };
  }, [filtered]);

  const handleQuickAction = (client: Client) => {
    const actionLabel = quickActionForSegment(client.segment);
    toast.success(`${actionLabel} sent to ${client.name}!`, {
      description:
        client.segment === "At-Risk"
          ? "Triggered retention playbook with incentive."
          : client.segment === "Trial"
          ? "Conversion campaign launched for trial user."
          : "Upsell offer delivered to boost revenue.",
    });
  };

  return (
    <Card className="mt-6">
      <div className="mb-5 rounded-xl border border-[rgba(34,201,151,0.25)] bg-[rgba(34,201,151,0.08)] p-4">
        <div
          className="flex items-center gap-2"
          style={{ color: "var(--accent-green)" }}
        >
          <Sparkles className="w-4 h-4" />
          <span className="font-medium">AI Insight</span>
        </div>
        <p className="text-sm text-secondary mt-2">
          This week:{" "}
          <span style={{ color: "var(--accent-green)" }}>{summary.atRisk}</span> At-Risk need attention,
          <span style={{ color: "var(--accent-green)" }}> {summary.trial}</span> on Trial to convert,
          <span style={{ color: "var(--accent-green)" }}> {summary.high}</span> High-Value ready for upsell. Focus:{" "}
          <span style={{ color: "var(--accent-green)" }}>{summary.focus}</span>.
        </p>
        <button className="mt-3 inline-flex items-center gap-2 px-3 py-1 text-xs rounded-md border border-emerald-500/40 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 transition">
          Focus retention
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h2
          className="text-lg font-semibold"
          style={{ color: "var(--accent-green)" }}
        >
          Clients Overview
        </h2>
        <div className="flex items-center gap-2">
          {filters.map((segment) => (
            <button
              key={segment}
              onClick={() => handleFilterChange(segment)}
              className={`px-3 py-1 text-sm rounded-md border transition ${
                filter === segment
                  ? "bg-green-500/20 border-green-400 text-green-300"
                  : "border-gray-700 text-gray-400 hover:border-gray-500"
              }`}
            >
              {segment}
            </button>
          ))}
          <button
            onClick={() => exportToCSV(filtered)}
            className="ml-2 inline-flex items-center gap-2 px-3 py-1 text-sm rounded-md border border-gray-700 text-gray-300 hover:border-gray-500 transition"
          >
            <DownloadCloud className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-sticky w-full text-sm text-primary">
          <thead>
            <tr className="text-gray-500 text-xs border-b border-[rgba(255,255,255,0.05)] uppercase">
              <th className="py-2 text-left">Name</th>
              <th>Email</th>
              <th>Segment</th>
              <th>Channel</th>
              <th>Engagement</th>
              <th>Activity</th>
              <th>Last Purchase</th>
              <th className="text-right">Quick Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((client) => {
              const color = engagementColor(client.engagement);
              const chartData = client.activity.map((value) => ({ value }));
              const highlightClass =
                client.segment === "At-Risk"
                  ? "ring-1 ring-red-500/20 bg-red-500/5"
                  : "";
              const engagementDescriptor = engagementLevel(client.engagement);

              return (
                <tr
                  key={client.id}
                  onMouseEnter={() => setHoverId(client.id)}
                  onMouseLeave={() => setHoverId(null)}
                  className={`relative border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(48,48,48,0.35)] transition ${highlightClass}`}
                >
                  <td className="py-2">{client.name}</td>
                  <td className="text-secondary">{client.email}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-md text-xs ${getBadgeClasses(client.segment)}`}
                    >
                      {client.segment}
                    </span>
                  </td>
                  <td>
                    <span className="inline-flex items-center gap-1 text-secondary">
                      <ChannelIcon ch={client.channel} />
                      {client.channel}
                    </span>
                  </td>
                  <td
                    title={`${client.engagement}% engagement – ${
                      client.segment === "At-Risk"
                        ? "Run retention nudge"
                        : client.segment === "Trial"
                        ? "Promote conversion offer"
                        : "Upsell premium"
                    }`}
                  >
                    <div className="relative bg-[rgba(52,52,52,0.7)] rounded-full h-2 w-24 overflow-hidden">
                      <div
                        className="h-2 transition-all duration-700"
                        style={{ width: `${client.engagement}%`, backgroundColor: color }}
                        title={`${client.engagement}% ${engagementDescriptor}`}
                      />
                    </div>
                  </td>
                  <td className="w-24">
                    <div className="hidden md:block w-24">
                      <ResponsiveContainer width={96} height={24}>
                        <LineChart data={chartData}>
                          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="md:hidden">
                      <ResponsiveContainer width={60} height={20} className="sparkline">
                        <LineChart data={chartData}>
                          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </td>
                  <td className="text-secondary">{client.lastPurchase}</td>
                  <td className="text-right relative">
                    <button
                      onClick={() => handleQuickAction(client)}
                      className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md border transition hover:scale-105 green-shadow ${
                        client.segment === "At-Risk"
                          ? "border-red-500/50 text-red-300 bg-red-500/10 hover:bg-red-500/20"
                          : "border-[rgba(34,201,151,0.4)] text-[var(--accent-green)] bg-[rgba(34,201,151,0.1)] hover:bg-[rgba(34,201,151,0.18)]"
                      }`}
                      title="One-click automation"
                    >
                      <CornerUpRight className="w-3 h-3" />
                      {quickActionForSegment(client.segment)}
                    </button>
                    {hoverId === client.id && (
                      <div className="pointer-events-none absolute right-0 -top-2 translate-y-[-100%] z-10 w-56 rounded-xl border border-emerald-500/30 bg-emerald-900/20 backdrop-blur-md px-3 py-2 text-xs text-emerald-200 shadow-lg">
                        <div className="font-medium mb-1">AI Tip</div>
                        <p>
                          {client.segment === "High-Value"
                            ? "Upsell premium bundle (+$200 LTV)"
                            : client.segment === "Trial"
                            ? "Trigger conversion offer within 24h"
                            : "Send retention nudge & 5% coupon"}
                        </p>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
