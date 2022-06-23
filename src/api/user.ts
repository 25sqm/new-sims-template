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
export async function logIn(username: string, password: string) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const response = await http.post("/api/login", {
      username: username,
      password: password,
    });
    return response;
  } catch (err: any) {
    console.log(err.response);
    return null;
  }
}

export async function getAssignedLocation() {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };

    const response = await http.get("/api/v1/client-locations", headers);
    return response;
  } catch (err: any) {
    console.log(err.response);
    return null;
  }
}
