const axios = require("axios");

// let authToken = sessionStorage.getItem("token");

// Initial Config of API Route URLs
const http = axios.create({
  baseURL: "http://18.141.0.46",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export async function getServiceOrders() {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const response = await http.get("/api/admin/service-order/search", headers);
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function getServiceTasks(id: number) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const response = await http.get(
      `/api/admin/service-order/task/search?id=${id}`,
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}
