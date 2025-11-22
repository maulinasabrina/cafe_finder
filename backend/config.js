// backend/config.js
require('dotenv').config();  // load .env

module.exports = {
  SERP_API_KEY: process.env.SERP_API_KEY,
  SERP_BASE_URL: process.env.SERP_BASE_URL,
};
