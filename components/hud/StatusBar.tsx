"use client";
import { useEffect, useState } from "react";

export function StatusBar() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      const ss = d.getSeconds().toString().padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-0 inset-x-0 z-40 hidden md:block">
      <div className="mx-auto max-w-[1500px] px-6 pb-4">
        <div className="hud-panel rounded-full flex items-center justify-between px-5 py-2 text-[11px] tracking-[0.18em] text-text-muted">
          <span className="flex items-center gap-2.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            Available for work
          </span>
          <div className="flex items-center gap-5">
            <span>Hyderabad, India</span>
            <span className="font-mono text-primary/80">{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
