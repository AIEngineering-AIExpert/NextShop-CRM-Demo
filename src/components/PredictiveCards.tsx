"use client";

import Card from "@/components/ui/Card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const salesData = [
  { day: "Mon", value: 500 },
  { day: "Tue", value: 620 },
  { day: "Wed", value: 720 },
  { day: "Thu", value: 810 },
  { day: "Fri", value: 930 },
  { day: "Sat", value: 970 },
  { day: "Sun", value: 1050, predicted: 1120 },
  { day: "Mon+", value: 0, predicted: 1180 },
];

const churnData = [
  { week: 1, risk: 10 },
  { week: 2, risk: 11 },
  { week: 3, risk: 12 },
  { week: 4, risk: 13, predicted: 13.5 },
  { week: 5, risk: 0, predicted: 14 },
];

const revenueData = [
  { month: "Jan", rev: 12.4 },
  { month: "Feb", rev: 13.1 },
  { month: "Mar", rev: 15.2 },
  { month: "Apr", rev: 16.5, predicted: 17.3 },
  { month: "May", rev: 0, predicted: 18.1 },
];

const sharedTooltipStyle = {
  backgroundColor: "#1F1F1F",
  border: "none",
  borderRadius: "0.5rem",
  color: "var(--text-primary)",
  fontSize: "12px",
};

export default function PredictiveCards() {
  return (
    <section className="mt-10">
      <h2
        className="text-lg font-semibold mb-4"
        style={{ color: "var(--accent-green)" }}
      >
        Predictive Analytics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass p-8 rounded-2xl">
          <h3 className="text-lg font-semibold text-primary mb-2">
            Sales Forecast
          </h3>
          <p className="text-secondary text-sm mb-4">
            Expected next week: +12%
          </p>
          <ResponsiveContainer width="100%" height={90}>
            <LineChart data={salesData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--accent-green)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4 }}
                style={{
                  filter: "drop-shadow(0 0 6px rgba(34,201,151,0.3))",
                  transition: "all 0.3s ease",
                }}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="var(--accent-green)"
                strokeOpacity={0.4}
                strokeDasharray="4 4"
                dot={false}
              />
              <Tooltip cursor={false} contentStyle={sharedTooltipStyle} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="glass p-8 rounded-2xl">
          <h3 className="text-lg font-semibold text-primary mb-2">
            Customer Churn Risk
          </h3>
          <p className="text-secondary text-sm mb-4">
            Current: 12% ↑ (+1%)
          </p>
          <ResponsiveContainer width="100%" height={90}>
            <LineChart data={churnData}>
              <Line
                type="monotone"
                dataKey="risk"
                stroke="#F87171"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4 }}
                style={{
                  filter: "drop-shadow(0 0 6px rgba(248,113,113,0.25))",
                  transition: "all 0.3s ease",
                }}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#F87171"
                strokeOpacity={0.35}
                strokeDasharray="4 4"
                dot={false}
              />
              <Tooltip cursor={false} contentStyle={sharedTooltipStyle} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="glass p-8 rounded-2xl">
          <h3 className="text-lg font-semibold text-primary mb-2">
            Revenue Growth
          </h3>
          <p className="text-secondary text-sm mb-4">
            Projected +18% Q2
          </p>
          <ResponsiveContainer width="100%" height={90}>
            <LineChart data={revenueData}>
              <Line
                type="monotone"
                dataKey="rev"
                stroke="var(--accent-blue)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4 }}
                style={{
                  filter: "drop-shadow(0 0 6px rgba(59,130,246,0.3))",
                  transition: "all 0.3s ease",
                }}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="var(--accent-blue)"
                strokeOpacity={0.35}
                strokeDasharray="4 4"
                dot={false}
              />
              <Tooltip cursor={false} contentStyle={sharedTooltipStyle} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </section>
  );
}
