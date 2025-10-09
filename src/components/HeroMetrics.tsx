"use client";

import { useMemo } from "react";
import { DollarSign, TrendingDown, Users } from "lucide-react";
import { mockSales } from "@/lib/data";

const newClients = 24;
const churnRate = 5;

const HeroMetrics = () => {
  const { totalRevenue, deltaPct } = useMemo(() => {
    const revenueSum = mockSales.reduce((sum, sale) => sum + sale.revenue, 0);

    const firstThree = mockSales
      .slice(0, 3)
      .reduce((sum, sale) => sum + sale.revenue, 0);
    const lastThree = mockSales
      .slice(-3)
      .reduce((sum, sale) => sum + sale.revenue, 0);

    const delta =
      ((lastThree - firstThree) / Math.max(firstThree, 1)) * 100;

    return {
      totalRevenue: revenueSum,
      deltaPct: Number.isFinite(delta)
        ? Math.round(delta * 10) / 10
        : 0,
    };
  }, []);

  const formattedRevenue = totalRevenue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const revenueDeltaLabel = `${deltaPct >= 0 ? "+" : ""}${deltaPct}% vs last period`;
  const isDeltaPositive = deltaPct >= 0;

  return (
    <section className="grid gap-4 md:grid-cols-3" aria-live="polite">
      <div className="glass gradient-border p-6 fade-in relative overflow-hidden">
        <div className="absolute top-4 right-4 opacity-80">
          <DollarSign
            size={26}
            className="text-primary"
            style={{ filter: "drop-shadow(0 0 8px rgba(34,201,151,0.4))" }}
          />
        </div>
        <div
          className="h-[2px] w-10 rounded-full mb-2"
          style={{ background: "var(--accent-gradient)" }}
        />
        <span className="text-[11px] tracking-widest uppercase text-secondary">
          Total Revenue
        </span>
        <p
          role="text"
          aria-label={`Total revenue ${formattedRevenue}`}
          className="mt-2 text-2xl font-semibold text-primary"
        >
          <span className="accent-text">{formattedRevenue}</span>
        </p>
        <span
          className="mt-3 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px]"
          style={{
            backgroundColor: isDeltaPositive
              ? "rgba(34,201,151,0.12)"
              : "rgba(244,63,94,0.12)",
            color: isDeltaPositive ? "var(--accent-green)" : "#fda4af",
            border: `1px solid ${
              isDeltaPositive ? "rgba(34,201,151,0.28)" : "rgba(244,63,94,0.28)"
            }`,
          }}
        >
          {isDeltaPositive ? "▲" : "▼"} {revenueDeltaLabel}
        </span>
      </div>

      <div className="glass gradient-border p-6 fade-in relative overflow-hidden">
        <div className="absolute top-4 right-4 opacity-80">
          <Users
            size={26}
            className="text-primary"
            style={{ filter: "drop-shadow(0 0 8px rgba(34,201,151,0.4))" }}
          />
        </div>
        <div
          className="h-[2px] w-10 rounded-full mb-2"
          style={{ background: "var(--accent-gradient)" }}
        />
        <span className="text-[11px] tracking-widest uppercase text-secondary">
          New Clients
        </span>
        <p
          role="text"
          aria-label={`New clients ${newClients}`}
          className="mt-2 text-2xl font-semibold text-primary"
        >
          {newClients}
        </p>
        <span
          className="mt-3 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] text-secondary"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border-color)",
          }}
        >
          Active sign-ups
        </span>
      </div>

      <div className="glass gradient-border p-6 fade-in relative overflow-hidden">
        <div className="absolute top-4 right-4 opacity-80">
          <TrendingDown
            size={26}
            className="text-primary"
            style={{ filter: "drop-shadow(0 0 8px rgba(34,201,151,0.4))" }}
          />
        </div>
        <div
          className="h-[2px] w-10 rounded-full mb-2"
          style={{ background: "var(--accent-gradient)" }}
        />
        <span className="text-[11px] tracking-widest uppercase text-secondary">
          Churn Rate
        </span>
        <p
          role="text"
          aria-label={`Churn rate ${churnRate} percent`}
          className="mt-2 text-2xl font-semibold text-primary"
        >
          {churnRate}%
        </p>
        <span
          className="mt-3 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] text-secondary"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border-color)",
          }}
        >
          Monthly roll-off
        </span>
      </div>
    </section>
  );
};

export default HeroMetrics;
