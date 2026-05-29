"use client";
import { useSound } from "@/hooks/useSound";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function SoundToggle() {
  const { enabled, toggle, beep } = useSound();

  return (
    <motion.button
      onClick={() => {
        toggle();
        if (!enabled) setTimeout(() => beep(620, 0.06, "sine"), 60);
      }}
      whileTap={{ scale: 0.94 }}
      whileHover={{ y: -2 }}
      aria-label="Toggle sound"
      className="fixed bottom-16 md:bottom-20 right-4 z-40 h-11 w-11 rounded-full hud-panel-strong grid place-items-center text-primary border border-primary/40 hover:shadow-glow"
    >
      {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
      <span className="sr-only">{enabled ? "Mute" : "Enable sound"}</span>
    </motion.button>
  );
}
