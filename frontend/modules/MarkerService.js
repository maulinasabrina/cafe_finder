export function renderCafesOnMap(map, cafes) {
  if (!map || !cafes || cafes.length === 0) return;

  const markers = [];

  cafes.forEach(cafe => {
    const marker = L.marker([cafe.lat, cafe.lng], {
      icon: L.icon({
        iconUrl: "./assets/coffee.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      })
    })
    .addTo(map)
    .bindPopup(`
      <strong>${cafe.name}</strong><br>
      Rating: ${cafe.rating || "N/A"}<br>
      ${cafe.address || ""}
    `);

    markers.push(marker);
  });

  // Fit map bounds ke semua marker
  const group = new L.featureGroup(markers);
  map.fitBounds(group.getBounds().pad(0.2));
}
