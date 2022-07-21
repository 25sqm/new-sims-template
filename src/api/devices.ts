const axios = require("axios");

// Initial Config of API Route URLs
const http = axios.create({
  baseURL: "http://18.141.0.46",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

interface RowData {
  deviceID: string;
  deviceType: string;
  deviceCode: string;
  area: string;
  level: string;
  dateDeployed: string;
  timeDeployed: string;
  dateRemoved: string;
  frequency: string;
}

interface TableSortProps {
  data: RowData[];
}

interface DeviceData {
  device_type_ID: number;
  device_code: string;
  client_location_area_ID: number;
  client_location_ID: number;
  date_deployed: Date;
  time_deployed: Date;
  date_removed: Date;
  user_ID: number;
  f_m: number;
  f_t: number;
  f_w: number;
  f_th: number;
  f_f: number;
  f_sat: number;
  f_sun: number;
  top_pos: number;
  left_pos: number;
}

export async function getDevices(page: number) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");

    const authToken = sessionStorage.getItem("token");
    const headers = {
      params: { page: page.toString() },
      headers: { Authorization: `Bearer ${authToken}` },
    };

    const response = await http.get("/api/di", headers);
    return response;
    // return tableProps;
  } catch (err) {
    return {};
  }
}

export async function addDevice(deviceData: DeviceData) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");

    const authToken = sessionStorage.getItem("token");
    const config = {
      params: deviceData,
      headers: { Accept: "*/*", Authorization: `Bearer ${authToken}` },
    };

    const newData = {
      ...deviceData,
      date_deployed: deviceData.date_deployed
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      time_deployed: deviceData.time_deployed
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      date_removed: deviceData.date_removed
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
    };

    const response = await http.post("/api/di", newData, config);
    return response.data;
    // return tableProps;
  } catch (err) {
    throw err;
  }
}
