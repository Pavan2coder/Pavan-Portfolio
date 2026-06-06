"use client";
import { SoundContext, useSoundProvider } from "@/hooks/useSound";
import { MouseParallaxProvider } from "@/hooks/useMouseParallax";

export function Providers({ children }: { children: React.ReactNode }) {
  const sound = useSoundProvider();
  return (
    <SoundContext.Provider value={sound}>
      <MouseParallaxProvider>
        {children}
      </MouseParallaxProvider>
    </SoundContext.Provider>
  );
}
