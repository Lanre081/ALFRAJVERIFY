const axios = require("axios");
const PAYSTACK_API_KEY = process.env.PAYSTACK_API_KEY;

const url = "https://api.paystack.co";

const api = axios.create({
  baseURL: url,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${PAYSTACK_API_KEY}`;
  return config;
});

api.interceptors.response.use((res) => res.data);

module.exports = api;
