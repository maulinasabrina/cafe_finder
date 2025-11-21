export function getUserLocation(map) {

     if (!map || typeof map.setView !== 'function') {
    console.error("geoloc menerima bukan object map!", map);
    return;
  }

  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
    
   
        map.setView([lat, lng], 14); // Center map on user location
      
      var marker = L.marker([lat, lng])
      .addTo(map)
       .bindPopup("📍 You are here")
        .openPopup();
   
        var circle = L.circle([lat, lng], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(map);
       
    },
    (error) => {
      console.error("Error getting location:", error);
      alert("Unable to retrieve your location. Using default map center.");
    }
  );
}
