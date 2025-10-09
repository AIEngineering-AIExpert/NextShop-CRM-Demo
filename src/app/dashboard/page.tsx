import AIAssistant from "@/components/AIAssistant";
import DashboardChart from "@/components/DashboardChart";
import HeroMetrics from "@/components/HeroMetrics";
import GrowthWidgets from "@/components/GrowthWidgets";
import PredictiveCards from "@/components/PredictiveCards";
import LiveFeed from "@/components/LiveFeed";
import TopProducts from "@/components/TopProducts";
import InventoryWidget from "@/components/InventoryWidget";
import ConversionFunnel from "@/components/ConversionFunnel";

export default function DashboardPage() {
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

      <div className="space-y-8">
        <HeroMetrics />

        <section className="gradient-border glass p-8">
          <DashboardChart />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white shadow-[0_0_5px_rgba(16,185,129,0.5)] mb-4">
            Growth Overview
          </h2>
          <GrowthWidgets />
        </section>

        <ConversionFunnel />

        <PredictiveCards />
      </div>

      <section className="mt-10">
        <TopProducts />
      </section>

      <InventoryWidget />

      <LiveFeed />

      <AIAssistant />
    </main>
  );
}
