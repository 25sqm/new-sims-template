const axios = require("axios");

// Initial Config of API Route URLs
const http = axios.create({
  baseURL: "http://18.141.0.46",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export async function getAreaMonitoringInfo() {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const response = await http.get(
      "/api/admin/area/monitoring/search",
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function getAreasInfo(location_id?: number) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const response = location_id
      ? await http.get(
          `/api/admin/area/information/search?location_id=${location_id}`,
          headers
        )
      : await http.get("/api/admin/area/information/search", headers);
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function getAreaThreshold() {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const response = await http.get(
      "/api/admin/area/threshold/search",
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function getPestIncidenceMap(
  service_order_ID: number,
  client_location_area_ID: number,
  pest_ID: number
) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const response = await http.get(
      `/api/admin/area/pest-incidence-map/search?service_order_ID=${service_order_ID}&client_location_area_ID=${client_location_area_ID}&pest_ID=${pest_ID}`,
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function getCriticalPests() {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const response = await http.get(
      "/api/admin/area/critical-pests/search",
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}
