import { initMap } from "./modules/MapInitializer.js";
import { getUserLocation } from "./modules/UserLocation.js";


document.addEventListener("DOMContentLoaded", () => {
  const map =initMap(); // load map
  getUserLocation(map);
});