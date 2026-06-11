export function formatLat(lat) {
  const d = Math.abs(lat).toFixed(4);
  return `${d}° ${lat >= 0 ? 'N' : 'S'}`;
}

export function formatLng(lng) {
  const d = Math.abs(lng).toFixed(4);
  return `${d}° ${lng >= 0 ? 'E' : 'W'}`;
}

export function formatTime(seconds) {
  if (Number.isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}
