export function initMap() {
  // Default center Jakarta
  const defaultLat = -6.2;
  const defaultLng = 106.8;

  // initialize the map on the "map" div with a given center and zoom
  var map = L.map('map', {
    center: [defaultLat, defaultLng],
    zoom: 13
  });
 
  // // Add OpenStreetMap tiles
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  return map;
}
