import { initMap } from "./frontendmodules/MapInitializer.js";
import { getUserLocation } from "./frontend/modules/UserLocation.js";
import { renderCafesOnMap } from "./frontend/modules/MarkerService.js";

let map;
let userLat, userLng;
const radiusSelect = document.getElementById("radiusSelect");



document.addEventListener("DOMContentLoaded", async () => {
  map = initMap();

  navigator.geolocation.getCurrentPosition(async (position) => {
    userLat = position.coords.latitude;
    userLng = position.coords.longitude;

    getUserLocation(map);


    // Initial fetch (all nearby cafes)
    await fetchAndRenderCafes("cafes");
  });

  document.getElementById("searchBtn").addEventListener("click", async () => {
    const keyword = document.getElementById("searchInput").value;
    const radius = Number(radiusSelect.value); // radius dalam meter
    await fetchAndRenderCafes(keyword, radius);
  });
});


async function fetchAndRenderCafes(keyword, radius = 5000) {

  try {
    // Backend API: tambahkan query parameter 'q' untuk keyword
    const url = `http://localhost:3000/api/cafes?lat=${userLat}&lng=${userLng}&q=${encodeURIComponent(keyword)}`;
    const res = await fetch(url);
    const cafes = await res.json();
   



    renderCafesOnMap(map, cafes,  userLat, userLng, radius);
  } catch (err) {
    console.error("Failed to fetch cafes:", err);
  }
}
