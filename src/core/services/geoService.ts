/**
 * Distance Calculation & Location Privacy Services
 */

// Calculates Haversine distance in kilometers between two lat/lng coordinates
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return Math.round(d * 10) / 10; // Round to 1 decimal place
}

// Formats a fuzzy privacy-masked location string before gig acceptance
export function formatApproximateLocation(localityName: string, cityName: string, distanceKm?: number): string {
  if (distanceKm !== undefined) {
    return `Near ${localityName}, ${cityName} · ~${distanceKm} km away`;
  }
  return `Near ${localityName}, ${cityName}`;
}

// Adds slight random offset to coordinates for privacy pin display before acceptance
export function getMaskedCoordinates(lat: number, lng: number): { lat: number; lng: number } {
  // ~100m jitter offset
  const latOffset = (Math.random() - 0.5) * 0.003;
  const lngOffset = (Math.random() - 0.5) * 0.003;
  return {
    lat: lat + latOffset,
    lng: lng + lngOffset
  };
}
