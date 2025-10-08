"use client";

import { useMemo, useState, useTransition } from "react";
import Button from "@/components/ui/Button";
import { mockAIResponses } from "@/lib/data";

const AIInsight = () => {
  const [prompt, setPrompt] = useState("");
  const [insight, setInsight] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const placeholder = useMemo(
    () =>
      "Ask the assistant about trends, inventory risks, or upcoming campaigns...",
    [],
  );

  const handleGenerate = () => {
    startTransition(() => {
      const randomIndex = Math.floor(Math.random() * mockAIResponses.length);
      const response = mockAIResponses[randomIndex];

      // Simulate small processing delay for UX polish
      setInsight(null);
      setTimeout(() => {
        setInsight(response);
      }, 300);
    });
  };

  return (
    <div className="space-y-4 text-primary fade-in">
      <div className="space-y-1">
        <div
          className="h-[2px] w-16 rounded-full"
          style={{ background: "var(--accent-gradient)" }}
        />
        <h2 className="text-lg font-semibold text-primary">AI Sales Insights</h2>
        <p className="text-sm text-secondary">
          Generate quick recommendations powered by your sales signals.
        </p>
      </div>

      <textarea
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        placeholder={placeholder}
        className="min-h-[120px] w-full resize-none rounded-lg border border-[var(--border-color)] bg-[rgba(31,31,31,0.8)] px-4 py-3 text-sm text-primary placeholder:text-secondary focus:border-[var(--accent-green)]/40 focus:outline-none focus:ring focus:ring-[var(--accent-green)]/20"
      />

      <div className="flex items-center justify-between gap-3">
        <Button
          type="button"
          onClick={handleGenerate}
          disabled={isPending}
          className="px-5 py-2 text-sm font-semibold text-primary"
          style={{
            backgroundColor: "rgba(34,201,151,0.18)",
            border: "1px solid rgba(34,201,151,0.35)",
            boxShadow: "0 0 15px rgba(34,201,151,0.25)",
          }}
        >
          {isPending ? "Analyzing..." : "Generate Insight"}
        </Button>
        <span className="text-xs uppercase tracking-wide text-secondary">
          v0.3 experimental
        </span>
      </div>

      {insight && (
        <div
          className="animate-fade rounded-lg p-4 text-sm text-primary"
          style={{
            backgroundColor: "rgba(34,201,151,0.12)",
            border: "1px solid rgba(34,201,151,0.28)",
            boxShadow: "0 0 18px rgba(34,201,151,0.2)",
          }}
        >
          {insight}
        </div>
      )}
    </div>
  );
};

export default AIInsight;
