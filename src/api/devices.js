const axios = require("axios");

const authToken = sessionStorage.getItem("token");

// Initial Config of API Route URLs
const http = axios.create({
  baseURL: "http://18.141.0.46",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer ${authToken}`,
  },
  withCredentials: true,
});

export async function getDevices() {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const response = await http.get("/api/di");
    // console.log("initial query data: ", response.data);
    let tableData = [];
    response.data.forEach((element) => {
      let freqString = "";
      if (element.f_m !== 0) {
        freqString.concat("M");
      }

      if (element.f_t !== 0) {
        freqString.concat(", ", "T");
      }

      if (element.f_w !== 0) {
        freqString.concat(", ", "W");
      }

      if (element.f_th !== 0) {
        freqString.concat(", ", "Th");
      }

      if (element.f_f !== 0) {
        freqString.concat(", ", "F");
      }

      if (element.f_sat !== 0) {
        freqString.concat(", ", "Sa");
      }

      if (element.f_sun !== 0) {
        freqString.concat(", ", "Sun");
      }

      const dateDeployed = new Date(element.date_deployed).toLocaleDateString();
      const timeDeployed = new Date(element.time_deployed).toLocaleTimeString();
      const dateRemoved = new Date(element.date_removed).toLocaleDateString();
      const level = element.level === null ? "" : element.level.toString();
      const area = element.client_location_ID.toString();

      const tableObject = {
        deviceID: element.device_ID.toString(),
        deviceType: element.device_type_name,
        deviceCode: element.device_code,
        area: area,
        level: level,
        dateDeployed: dateDeployed,
        timeDeployed: timeDeployed,
        dateRemoved: dateRemoved,
        frequency: freqString,
      };
      tableData.push(tableObject);
    });
    const tableProps = {
      data: tableData,
    };
    return tableData;
  } catch (err) {
    console.log(err);
    return [];
  }
}
