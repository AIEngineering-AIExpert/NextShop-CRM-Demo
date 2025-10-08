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

const tooltipStyle = {
  backgroundColor: "rgba(15, 23, 42, 0.9)",
  border: "1px solid rgba(0, 255, 136, 0.35)",
  borderRadius: "12px",
  color: "#E2E8F0",
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div style={tooltipStyle} className="px-3 py-2 text-sm">
        <p
          className="font-medium"
          style={{ color: "var(--accent-green)" }}
        >
          {label} • {formatCurrency(Number(payload[0].value))}
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
        <h2 className="text-lg font-semibold text-primary">Weekly Revenue</h2>
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
