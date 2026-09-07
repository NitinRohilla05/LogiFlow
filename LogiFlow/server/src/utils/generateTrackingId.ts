function generateTrackingId(): string {
  const randomNumber = Math.floor(
    100000000 + Math.random() * 900000000
  );

  return `LF${randomNumber}`;
}

export function generateUniqueTrackingId(
  existingIds: Set<string> = new Set()
): string {
  let trackingId = generateTrackingId();

  while (existingIds.has(trackingId)) {
    trackingId = generateTrackingId();
  }

  return trackingId;
}