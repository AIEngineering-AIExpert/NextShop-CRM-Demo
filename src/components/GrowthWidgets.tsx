"use client";

import React from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";

type GrowthDatum = {
  label: string;
  value: string;
  trend: "up" | "down" | "flat";
  color: "emerald" | "sky" | "violet";
};

const growthData: readonly GrowthDatum[] = [
  { label: "Monthly Growth", value: "+12.4%", trend: "up", color: "emerald" },
  { label: "Active Trials", value: "132", trend: "flat", color: "sky" },
  { label: "New Subscriptions", value: "+57", trend: "up", color: "violet" },
] as const;

const colorStyles: Record<
  GrowthDatum["color"],
  { icon: string; gradient: string; glow: string }
> = {
  emerald: {
    icon: "var(--accent-green)",
    gradient:
      "linear-gradient(90deg, rgba(34,201,151,0.2) 0%, rgba(34,201,151,0.55) 100%)",
    glow: "0 0 12px rgba(34,201,151,0.35)",
  },
  sky: {
    icon: "#60a5fa",
    gradient:
      "linear-gradient(90deg, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.5) 100%)",
    glow: "0 0 12px rgba(59,130,246,0.3)",
  },
  violet: {
    icon: "#a78bfa",
    gradient:
      "linear-gradient(90deg, rgba(167,139,250,0.18) 0%, rgba(167,139,250,0.5) 100%)",
    glow: "0 0 12px rgba(167,139,250,0.3)",
  },
};

const trendIconMap: Record<GrowthDatum["trend"], typeof ArrowUpRight> = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: ArrowRight,
};

export default function GrowthWidgets() {
  return (
    <div className="grid gap-6 md:grid-cols-3 mt-10 fade-in text-primary">
      {growthData.map((g) => {
        const Icon = trendIconMap[g.trend];
        const palette = colorStyles[g.color];

        return (
          <div
            key={g.label}
            className="glass gradient-border p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200 relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <p className="text-xs text-secondary uppercase">{g.label}</p>
              <Icon
                size={18}
                className="opacity-90"
                style={{ color: palette.icon, filter: `drop-shadow(${palette.glow})` }}
              />
            </div>
            <p
              className="text-xl font-semibold text-primary mt-2"
              role="text"
              aria-label={`${g.label} ${g.value}`}
            >
              {g.value}
            </p>
            <div
              className="mt-3 h-1 rounded-full"
              style={{ background: palette.gradient }}
            />
          </div>
        );
      })}
    </div>
  );
}
