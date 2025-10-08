"use client";

import type { CSSProperties } from "react";

type PlanCardProps = {
  name: string;
  price: string;
  features: readonly string[];
  accent: string;
};

const PlanCard = ({ name, price, features, accent }: PlanCardProps) => {
  return (
    <div
      className="relative overflow-hidden gradient-border glass p-8 text-center transition-transform hover:-translate-y-1 fade-up"
      style={
        {
          "--accent-color": accent,
          boxShadow: "0 0 18px rgba(34,201,151,0.18)",
        } as CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-x-10 bottom-0 h-48 rounded-full blur-3xl opacity-60"
        style={{
          background: `radial-gradient(circle, ${accent}40 0%, transparent 70%)`,
        }}
      />

      <div className="relative space-y-5">
        <h3
          className="text-xl font-semibold"
          style={{ background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          {name}
        </h3>
        <p className="text-3xl font-bold text-primary">{price}</p>
        <ul className="mb-6 space-y-2 text-sm text-secondary">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-center justify-center gap-2 text-secondary"
            >
              <span style={{ color: "var(--accent-green)" }}>✓</span>
              {feature}
            </li>
          ))}
        </ul>
        <button
          type="button"
          style={{
            backgroundColor: "rgba(34,201,151,0.18)",
            border: "1px solid rgba(34,201,151,0.35)",
            color: "var(--accent-green)",
            boxShadow: "0 0 12px rgba(34,201,151,0.25)",
          }}
          className="relative rounded-lg px-5 py-2 text-sm font-semibold transition"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
