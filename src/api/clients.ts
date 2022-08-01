const axios = require("axios");

// Initial Config of API Route URLs
const http = axios.create({
  baseURL: "http://18.141.0.46",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export async function getClientInformation() {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const response = await http.get(
      "/api/admin/client/information/search",
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function getClientSites(clientID: number) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const response = await http.get(
      `/api/admin/client/site-information/search?id=${clientID}`,
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}
