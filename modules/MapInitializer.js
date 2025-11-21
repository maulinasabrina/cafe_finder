export function initMap() {
  // Default center Jakarta
  const defaultLat = -6.2;
  const defaultLng = 106.8;

  // Initialize map
  const map = L.map('map').setView([-6.2, 106.8], 14);
 
  // Add OpenStreetMap tiles
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  return map;
}
