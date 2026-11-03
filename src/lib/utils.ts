export function errMsg(e: unknown, fallback = "Something went wrong"): string {
  return e instanceof Error ? e.message : fallback;
}

export function formatDate(value: string | Date): string {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
