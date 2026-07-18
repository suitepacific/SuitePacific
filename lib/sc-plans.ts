export function getSeatLimit(plan: string, seatLimitOverride?: number | null): number {
  if (seatLimitOverride != null && seatLimitOverride > 0) return seatLimitOverride;
  if (plan === "team") return 5;
  return 1;
}
