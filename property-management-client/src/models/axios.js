import axios from "axios";

// Create an instance with custom configuration
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001", // Base URL for API calls
  withCredentials: true, // Include cookies in requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
