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
  deviceID: string,
  deviceType: string,
  deviceCode: string,
  area: string,
  level: string,
  dateDeployed: string,
  timeDeployed: string,
  dateRemoved: string,
  frequency: string
}

interface TableSortProps {
  data: RowData[];
}

export async function getDevices(page : number) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");

    const authToken = sessionStorage.getItem("token");
    const headers = { params: { page: page.toString() }, headers: { Authorization: `Bearer ${authToken}` } };

    const response = await http.get("/api/di", headers);
    return response
    // return tableProps;
  } catch (err) {
    console.log(err);
    return {}
  }
}
