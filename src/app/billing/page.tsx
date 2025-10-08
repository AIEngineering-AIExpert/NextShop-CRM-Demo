import PlanCard from "@/components/PlanCard";
import { mockPlans } from "@/lib/plans";

export default function BillingPage() {
  return (
    <main className="p-10 space-y-10 max-w-6xl mx-auto fade-in text-primary">
      <header className="space-y-3">
        <div
          className="h-[2px] w-16 rounded-full"
          style={{ background: "var(--accent-gradient)" }}
        />
        <h1 className="text-3xl font-semibold accent-text">Billing</h1>
        <p className="text-sm text-secondary">
          Choose the plan that scales with your storefront and customers.
        </p>
      </header>
      <div className="grid gap-8 md:grid-cols-2">
        {mockPlans.map((plan) => (
          <PlanCard key={plan.id} {...plan} />
        ))}
      </div>
    </main>
  );
}
