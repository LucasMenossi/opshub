export function isValidCustomTimeRange(
  customStart: string,
  customEnd: string,
): boolean {
  if (!customStart || !customEnd) {
    return true;
  }

  const start = new Date(customStart).getTime();
  const end = new Date(customEnd).getTime();

  return !Number.isNaN(start) && !Number.isNaN(end) && start <= end;
}
