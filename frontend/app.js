import { initMap } from "./modules/MapInitializer.js";
import { getUserLocation } from "./modules/UserLocation.js";
import { renderCafesOnMap } from "./modules/MarkerService.js";

let map;
let userLat, userLng;



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
    await fetchAndRenderCafes(keyword);
  });
});

async function fetchAndRenderCafes(keyword) {

  try {
    // Backend API: tambahkan query parameter 'q' untuk keyword
    const url = `http://localhost:3000/api/cafes?lat=${userLat}&lng=${userLng}&q=${encodeURIComponent(keyword)}`;
    const res = await fetch(url);
    const cafes = await res.json();
    // console.log(`Fetched ${cafes.length} cafes for keyword "${keyword}"`);



    renderCafesOnMap(map, cafes,  userLat, userLng);
  } catch (err) {
    console.error("Failed to fetch cafes:", err);
  }
}
