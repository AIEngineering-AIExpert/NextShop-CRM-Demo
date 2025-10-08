import AIAssistant from "@/components/AIAssistant";
import DashboardChart from "@/components/DashboardChart";
import HeroMetrics from "@/components/HeroMetrics";
import GrowthWidgets from "@/components/GrowthWidgets";
import PredictiveCards from "@/components/PredictiveCards";
import LiveFeed from "@/components/LiveFeed";
import TopProducts from "@/components/TopProducts";
import InventoryWidget from "@/components/InventoryWidget";
import { mockSales } from "@/lib/data";

export default function DashboardPage() {
  const totalRevenue = mockSales.reduce((sum, sale) => sum + sale.revenue, 0);
  const formattedTotal = totalRevenue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <main className="p-10 space-y-10 max-w-6xl mx-auto fade-in">
      <header className="space-y-3 text-primary">
        <div
          className="h-[2px] w-16 rounded-full"
          style={{ background: "var(--accent-gradient)" }}
        />
        <h1 className="text-3xl font-semibold accent-text">Dashboard</h1>
        <p className="text-sm text-secondary">
          Insights, customers, and billing metrics in a single command center.
        </p>
      </header>

      <HeroMetrics />

      <section className="gradient-border glass p-8 text-primary">
        <p className="text-sm uppercase tracking-widest text-secondary">
          Total Revenue
        </p>
        <div className="mt-3 text-4xl font-semibold">
          <span className="glow-number accent-text">{formattedTotal}</span>
        </div>
      </section>

      <section className="gradient-border glass p-8">
        <DashboardChart />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4 accent-text">Growth Overview</h2>
        <GrowthWidgets />
      </section>

      <PredictiveCards />

      <section className="mt-10">
        <TopProducts />
      </section>

      <InventoryWidget />

      <LiveFeed />

      <AIAssistant />
    </main>
  );
}
