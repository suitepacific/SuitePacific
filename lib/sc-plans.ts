export function getSeatLimit(plan: string, seatLimitOverride?: number | null): number {
  if (seatLimitOverride != null && seatLimitOverride > 0) return seatLimitOverride;
  if (plan === "team") return 5;
  return 1;
}

export function getClientLimit(plan: string, clientLimitOverride?: number | null): number {
  if (clientLimitOverride != null && clientLimitOverride > 0) return clientLimitOverride;
  if (plan === "team") return 10;
  if (plan === "pro") return 5;
  return 1;
}
