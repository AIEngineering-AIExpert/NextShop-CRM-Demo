"use client";

import { useEffect, useState } from "react";

type ThemeToggleProps = {
  className?: string;
};

const ThemeToggle = ({ className = "w-full" }: ThemeToggleProps) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("dark")) {
      root.classList.add("dark");
    }
    setIsDark(root.classList.contains("dark"));

    const handleThemeChange = (event: Event) => {
      const detail = (event as CustomEvent<{ isDark: boolean }>).detail;
      if (detail && typeof detail.isDark === "boolean") {
        setIsDark(detail.isDark);
      }
    };

    window.addEventListener("theme-change", handleThemeChange as EventListener);

    return () => {
      window.removeEventListener(
        "theme-change",
        handleThemeChange as EventListener,
      );
    };
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      const root = document.documentElement;
      if (next) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      window.dispatchEvent(new CustomEvent("theme-change", { detail: { isDark: next } }));
      return next;
    });
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      className={`flex items-center justify-between rounded-xl border border-[rgba(34,201,151,0.25)] bg-[rgba(34,201,151,0.08)] px-3 py-2 text-sm text-primary transition hover:border-[rgba(34,201,151,0.45)] hover:bg-[rgba(34,201,151,0.14)] ${className}`}
    >
      <span className="font-medium">Dark Mode</span>
      <span
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
          isDark ? "bg-emerald-500/80" : "bg-gray-400/60"
        }`}
      >
        <span
          className={`absolute left-1 inline-flex h-4 w-4 transform items-center justify-center rounded-full bg-white text-[10px] font-semibold text-gray-700 transition ${
            isDark ? "translate-x-5" : "translate-x-0"
          }`}
        >
          {isDark ? "ON" : "OFF"}
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle;
