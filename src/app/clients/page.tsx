import ClientTable from "@/components/ClientTable";

export default function ClientsPage() {
  return (
    <main className="p-10 space-y-6 max-w-6xl mx-auto fade-in text-primary">
      <header className="space-y-2">
        <div
          className="h-[2px] w-16 rounded-full"
          style={{ background: "var(--accent-gradient)" }}
        />
        <h1 className="text-3xl font-semibold accent-text">Clients</h1>
        <p className="text-sm text-secondary">
          AI-powered segmentation and engagement insights.
        </p>
      </header>

      <ClientTable />
    </main>
  );
}
