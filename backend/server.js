const express = require("express");
// const fetch = require("node-fetch");
const cors = require("cors");

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const { SERP_API_KEY, SERP_BASE_URL } = require("./config.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // supaya frontend bisa request
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Cafe Finder API is running");
});

app.get("/api/cafes", async (req, res) => {
//  console.log("Received /api/cafes request with query:", req.query);
   
  const { lat, lng } = req.query;
  const { q = "cafe" } = req.query;

// 

  if (!lat || !lng) {
    return res.status(400).json({ error: "lat and lng query required" });
  }

  try {
    const url = `${SERP_BASE_URL}?engine=google_maps&api_key=${SERP_API_KEY}&type=search&q=${encodeURIComponent(q)}&ll=@${lat},${lng},14z`;

    const response = await fetch(url);
    const data = await response.json();
    
    const results = data.local_results || [];
    // console.log("Local results:", results);

    const cafes = results.map(item => ({
      name: item.title,
      rating: item.rating,
      address: item.address,
      lat: item.gps_coordinates.latitude,
      lng: item.gps_coordinates.longitude
    }));
    console.log(`Found ${cafes.length} cafes for query "${q}" at (${lat}, ${lng})`);

    res.json(cafes);
  } catch (err) {
    console.error("Error fetching SERP API:", err);
    res.status(500).json({ error: "Failed to fetch cafes" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
