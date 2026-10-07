export function capitalizeFirst(text?: string | null): string {
  const trimmed = text?.trim();
  if (!trimmed) return "";
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}