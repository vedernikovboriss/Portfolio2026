/** Set to override the availability label, e.g. `"SEP'26"`. Leave null for current month/year. */
export const AVAILABILITY_LABEL: string | null = null;

export function formatCurrentMonthYear(date = new Date()) {
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const year = String(date.getFullYear()).slice(-2);
  return `${month}'${year}`;
}

export function getAvailabilityLabel(date = new Date()) {
  return AVAILABILITY_LABEL ?? formatCurrentMonthYear(date);
}
