import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_BACKEND_API as string;

const dataService = axios.create({
  baseURL: API_ENDPOINT,
  headers: { "Content-Type": "application/json" },
});

export { dataService, API_ENDPOINT };
