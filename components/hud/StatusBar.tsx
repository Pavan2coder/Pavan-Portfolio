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
      <div className="mx-auto max-w-[1500px] px-6 pb-3">
        <div className="hud-panel rounded-md flex items-center justify-between px-4 py-2 text-[10px] font-display uppercase tracking-[0.3em] text-text-muted">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
              SYS / ONLINE
            </span>
            <span className="text-primary/70">CPU 32%</span>
            <span className="text-primary/70">MEM 41%</span>
            <span className="text-primary/70">NET 1.2GB/s</span>
          </div>
          <div className="flex items-center gap-4">
            <span>SECTOR / 07</span>
            <span>UPLINK / STABLE</span>
            <span className="text-primary">{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
