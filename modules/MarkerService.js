let cafeLayer = L.layerGroup(); // simpan layer global

export function renderCafesOnMap(map, cafes, userLat, userLng, radius = 5000) {
  if (!map || !cafes || cafes.length === 0) return;

  // Hapus marker lama
  cafeLayer.clearLayers();

  const userLatLng = L.latLng(userLat, userLng);
  const maxDistance = 5000; // radius 5 km
  const nearbyCafes = cafes.filter(cafe => {
    const cafeLatLng = L.latLng(cafe.lat, cafe.lng);
    return userLatLng.distanceTo(cafeLatLng) <= radius;
  });

  nearbyCafes.forEach(cafe => {
    const marker = L.marker([cafe.lat, cafe.lng], {
      icon: L.icon({
        iconUrl: "./assets/coffee.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      })
    }).bindPopup(`
      <strong>${cafe.name}</strong><br>
      Rating: ${cafe.rating || "N/A"}<br>
      ${cafe.address || ""}
    `);

    cafeLayer.addLayer(marker);
  });

  if (!map.hasLayer(cafeLayer)) map.addLayer(cafeLayer);

  // Fit map ke semua marker (atau setView ke user jika marker kosong)
  if (nearbyCafes.length > 0) {
    const group = L.featureGroup(cafeLayer.getLayers());
    map.fitBounds(group.getBounds().pad(0.2));
  } else {
    map.setView(userLatLng, 15); // fokus ke user
  }
}
