import { initMap } from "./modules/MapInitializer.js";
import { renderCafesOnMap } from "./modules/MarkerService.js";
import { getUserLocation } from "./modules/UserLocation.js";


document.addEventListener("DOMContentLoaded", () => {
  const map =initMap(); // load map
   navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    // Center map + user marker
    getUserLocation(map);
    
    // Fetch cafes dari backend
    const res = await fetch(`http://localhost:3000/api/cafes?lat=${lat}&lng=${lng}`);
    const cafes = await res.json();

 
    // Render marker café
    renderCafesOnMap(map, cafes);
  });
  // fetchCafes(-6.2, 106.8167).then(cafes => console.log(cafes));

});