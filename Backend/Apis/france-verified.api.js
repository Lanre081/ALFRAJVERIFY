const axios = require("axios");
const FRANCE_VERIFIED_API_KEY = process.env.FRANCE_VERIFIED_API_KEY;

const url = "https://franceverified.com/api/v1";

const api = axios.create({
  baseURL: url,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  config.headers.authorization = `Bearer ${FRANCE_VERIFIED_API_KEY}`;
  return config;
});



module.exports = api;
