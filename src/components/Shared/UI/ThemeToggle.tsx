import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V2a1 1 0 0 1 1-1Zm0 18a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1ZM4.22 4.22a1 1 0 0 1 1.41 0l1.42 1.42a1 1 0 1 1-1.42 1.41L4.22 5.64a1 1 0 0 1 0-1.42Zm12.73 12.73a1 1 0 0 1 1.41 0l1.42 1.42a1 1 0 0 1-1.42 1.41l-1.41-1.42a1 1 0 0 1 0-1.41ZM1 12a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1Zm18 0a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1ZM4.22 19.78a1 1 0 0 1 0-1.41l1.42-1.42a1 1 0 1 1 1.41 1.42l-1.41 1.41a1 1 0 0 1-1.42 0ZM16.95 6.05a1 1 0 0 1 0-1.41l1.41-1.42a1 1 0 1 1 1.42 1.42l-1.42 1.41a1 1 0 0 1-1.41 0Z" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
    <path d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73 8.15 8.15 0 0 1-8.14-8.1 8.59 8.59 0 0 1 .27-2.1A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 13.9 13.9 1 1 0 0 0-.26-3.26Z" />
  </svg>
);

export interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
    window.dispatchEvent(new CustomEvent("themechange", { detail: { light: next } }));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className={`theme-toggle relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-transparent border-0 cursor-pointer p-2 -m-2 text-white light:text-neutral-900 ${className}`}
    >
      <span className="relative inline-flex h-5 w-5 items-center justify-center md:h-6 md:w-6">
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={isLight ? "moon" : "sun"}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0"
          >
            {isLight ? <MoonIcon /> : <SunIcon />}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
};

export default ThemeToggle;
