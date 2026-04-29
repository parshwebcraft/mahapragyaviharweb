import { Globe } from "lucide-react";

export function FloatingBranding() {
  return (
    <a
      href="https://parshwebcraft.in"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-accent/20 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md transition hover:scale-105"
    >
      <Globe className="h-4 w-4 text-accent" />

      <span className="text-xs font-semibold text-accent">
        Built by ParshWebCraft
      </span>
    </a>
  );
}