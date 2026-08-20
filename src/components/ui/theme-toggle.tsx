"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  function toggleTheme() {
    const nextTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("able-theme", nextTheme);
  }

  return (
    <button type="button" onClick={toggleTheme} aria-label="Toggle light or dark theme" title="Toggle light or dark theme" className={`theme-toggle inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#e7e7e3] bg-white text-[#111111] transition hover:border-orange-300 ${className}`}>
      <Moon aria-hidden="true" className="theme-icon-light h-5 w-5" />
      <Sun aria-hidden="true" className="theme-icon-dark hidden h-5 w-5" />
    </button>
  );
}
