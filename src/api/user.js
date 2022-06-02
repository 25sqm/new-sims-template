const axios = require("axios");

// Initial Config of API Route URLs
const http = axios.create({
  baseURL: "http://18.141.0.46",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

// Function for logging in user
export async function logIn(username, password) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const response = await http.post("/api/login", {
      username: username,
      password: password,
    });
    return response;
  } catch (err) {
    console.log(err.response);
    return null;
  }
}
