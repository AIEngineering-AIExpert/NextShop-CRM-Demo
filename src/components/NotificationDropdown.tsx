"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Bell } from "lucide-react";

const alerts = [
  {
    title: "Low stock alert",
    detail: "iPhone 15 Pro Max inventory at 24 units.",
  },
  {
    title: "Churn risk",
    detail: "Alice Johnson flagged for retention play.",
  },
  {
    title: "Payment follow-up",
    detail: "Trial conversions down 3% this week.",
  },
];

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointer = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("touchstart", handlePointer);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("touchstart", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="relative inline-flex items-center justify-center rounded-full border border-[rgba(34,201,151,0.35)] bg-[rgba(34,201,151,0.1)] p-2 text-[var(--accent-green)] transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-green)]"
        style={{ boxShadow: "0 0 16px rgba(34,201,151,0.35)" }}
      >
        <Bell
          className="w-5 h-5"
          style={{ filter: "drop-shadow(0 0 6px rgba(34,201,151,0.55))" }}
        />
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white shadow-lg">
          {alerts.length}
        </span>
        <span className="sr-only">Toggle notifications</span>
      </button>

      {open ? (
        <div className="absolute right-0 z-40 mt-3 w-72 rounded-xl border border-[rgba(34,201,151,0.25)] bg-[rgba(15,15,15,0.95)] p-4 shadow-xl backdrop-blur-md">
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--accent-green)]">
            Latest Alerts
          </h4>
          <ul className="space-y-3 text-sm">
            {alerts.map((alert) => (
              <li
                key={alert.title}
                className="flex gap-3 rounded-lg border border-transparent bg-[rgba(32,32,32,0.6)] px-3 py-2 transition hover:border-[rgba(34,201,151,0.35)]"
              >
                <AlertCircle
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-400"
                  style={{ filter: "drop-shadow(0 0 4px rgba(250,204,21,0.5))" }}
                />
                <div className="space-y-0.5">
                  <p className="font-medium text-primary">{alert.title}</p>
                  <p className="text-xs text-secondary">{alert.detail}</p>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-4 w-full rounded-lg bg-[rgba(34,201,151,0.15)] px-3 py-2 text-xs font-semibold text-[var(--accent-green)] transition hover:bg-[rgba(34,201,151,0.22)]"
          >
            Dismiss
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default NotificationDropdown;
