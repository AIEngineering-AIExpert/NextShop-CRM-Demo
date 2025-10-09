"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  type TooltipProps,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { mockSales } from "@/lib/data";

const chartData = mockSales.map((entry) => ({
  ...entry,
  label: entry.date.slice(5),
}));

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const formatTooltipValue = (value: number) => {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}k`;
  }
  return formatCurrency(value);
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const datum = payload[0];
    const value = Number(datum.value);
    const rawDate = datum.payload?.date ?? label;
    const formattedDate = datum.payload?.date
      ? new Date(datum.payload.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      : rawDate;
    return (
      <div className="bg-black/80 text-white px-3 py-2 rounded-lg border border-[rgba(34,201,151,0.35)] shadow-lg backdrop-blur">
        <p className="text-xs uppercase tracking-wide text-white/60">Revenue</p>
        <p
          className="text-sm font-semibold"
          style={{ color: "var(--accent-green)" }}
        >
          {formatTooltipValue(value)}{" "}
          <span className="text-white/70">
            ({formattedDate})
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const DashboardChart = () => {
  return (
    <div className="space-y-5 fade-in text-primary">
      <div>
        <div
          className="h-[2px] w-16 rounded-full mb-2"
          style={{ background: "var(--accent-gradient)" }}
        />
        <h2 className="text-2xl font-bold text-white shadow-[0_0_5px_rgba(16,185,129,0.5)] mb-4">
          Weekly Revenue
        </h2>
      </div>
      <div className="h-72 rounded-xl border border-[var(--border-color)] bg-[rgba(31,31,31,0.9)] p-4 shadow-inner">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#00FF88" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#00B86B" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(148, 163, 184, 0.15)"
            />
            <XAxis
              dataKey="label"
              stroke="#94A3B8"
              tickLine={false}
              axisLine={false}
              className="text-xs"
            />
            <YAxis
              stroke="#94A3B8"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
              className="text-xs"
            />
            <Tooltip
              cursor={{ fill: "rgba(15, 23, 42, 0.3)" }}
              content={<CustomTooltip />}
            />
            <Bar
              className="revenue-bar"
              dataKey="revenue"
              fill="url(#revenueGradient)"
              radius={[10, 10, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;
