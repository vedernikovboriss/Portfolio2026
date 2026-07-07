"use client";

import { useState, useEffect } from "react";

const VALENCIA_TZ = "Europe/Madrid";
const CITY_LABEL = "Valencia";

type CityClock = {
  hour: string;
  minute: string;
  second: string;
  dayPeriod: string;
  dateLine: string;
};

function formatGmtOffset(date: Date, timeZone: string): string {
  const tzPart = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
  })
    .formatToParts(date)
    .find((p) => p.type === "timeZoneName")?.value;

  const match = tzPart?.match(/GMT([+-])(\d{1,2})/);
  if (!match) return "";

  const hours = match[2].padStart(2, "0");
  return `(GMT ${match[1]}${hours})`;
}

function formatCityClock(date: Date): CityClock {
  const timeParts = new Intl.DateTimeFormat("en-US", {
    timeZone: VALENCIA_TZ,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).formatToParts(date);

  const part = (type: Intl.DateTimeFormatPartTypes) =>
    timeParts.find((p) => p.type === type)?.value ?? "";

  const dateLine = new Intl.DateTimeFormat("en-US", {
    timeZone: VALENCIA_TZ,
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);

  return {
    hour: part("hour"),
    minute: part("minute"),
    second: part("second"),
    dayPeriod: part("dayPeriod"),
    dateLine: `${dateLine} ${formatGmtOffset(date, VALENCIA_TZ)}`,
  };
}

export default function TimeVLC({ className }: { className?: string }) {
  const [clock, setClock] = useState<CityClock | null>(null);

  useEffect(() => {
    const tick = () => setClock(formatCityClock(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!clock) {
    return (
      <div
        className={`flex flex-col items-end gap-1 text-right ${className ?? ""}`}
      >
        <span>{CITY_LABEL} —</span>
        <span>—</span>
      </div>
    );
  }

  const timeLine = `${clock.hour}:${clock.minute}:${clock.second} ${clock.dayPeriod}`;

  return (
    <div
      className={`flex flex-col md:items-end gap-0 md:text-right ${className ?? ""}`}
    >
      <span className="tabular-nums">
        {CITY_LABEL} {timeLine}
      </span>
      <span>{clock.dateLine}</span>
    </div>
  );
}
