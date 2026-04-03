"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import type { BeforeInstallPromptEvent } from "@/types/pwa";

import { Button } from "@/components/ui/button";

export function PwaInstallButton() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    }

    function handleAppInstalled() {
      setInstalled(true);
      setPromptEvent(null);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  async function handleInstall() {
    if (!promptEvent) return;

    promptEvent.prompt();
    await promptEvent.userChoice;
    setPromptEvent(null);
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleInstall}
      disabled={installed || !promptEvent}
      title={installed ? "App already installed" : "Install the app on your device"}
      className="group gap-2 border border-accent/10 bg-gradient-to-r from-primary via-[#ffe99d] to-primary px-5 text-accent shadow-[0_18px_50px_rgba(122,30,30,0.14)] transition hover:-translate-y-0.5 hover:from-[#ffe48a] hover:via-[#fff0b8] hover:to-[#f5d36a]"
    >
      <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
      <span className="font-semibold">{installed ? "Installed" : "Install App"}</span>
    </Button>
  );
}
