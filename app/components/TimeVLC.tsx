"use client";

import { useState, useEffect } from "react";

const VLC_TZ = "Europe/Madrid";

function formatTime(date: Date): string {
  return date.toLocaleTimeString("ru-RU", {
    timeZone: VLC_TZ,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export default function TimeVLC() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return <span className="block">—, Vlc</span>;

  return (
    <span className="subtitle-small block text-xs!">{time}, VLC, Spain</span>
  );
}
