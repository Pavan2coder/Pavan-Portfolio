"use client";
import { SoundContext, useSoundProvider } from "@/hooks/useSound";

export function Providers({ children }: { children: React.ReactNode }) {
  const sound = useSoundProvider();
  return <SoundContext.Provider value={sound}>{children}</SoundContext.Provider>;
}
