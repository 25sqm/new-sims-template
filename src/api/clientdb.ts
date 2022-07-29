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

export async function getData() {
  const csrf = await http.get("/sanctum/csrf-cookie");

  const authToken = sessionStorage.getItem("token");
  const headers = { headers: { Authorization: `Bearer ${authToken}` } };

  const breachCount = await http.get(
    "/api/client/breach-incidents-count",
    headers
  );
  const findingsCount = await http.get(
    "/api/client/findings-for-acknowledgement",
    headers
  );
  const acknowledgeCount = await http.get(
    "/api/client/service-orders/for-acknowledgement",
    headers
  );
  const nextVisit = await http.get(
    "/api/client/service-orders/next-visit",
    headers
  );
  const dailyPestCount = await http.get(
    "/api/client/daily-pest-count",
    headers
  );
  // console.log(dailyPestCount);
  const pieChartFindings = await http.get(
    "/api/client/pie-chart-findings",
    headers
  );
  const devicesData = await http.get("/api/v1/device/status", headers);
  const criticalFindings = await http.get(
    "/api/v1/findings/type/critical",
    headers
  );
  const pestCountMetrics = await http.get("/api/v1/pest_found/total", headers);
  let datasets: any = [];
  dailyPestCount.data.forEach((dataset: any) => {
    const label = dataset.pestCode;
    const values = dataset.number;
    const id = dataset.pest_id;
    const dataSetColor = random_rgba();
    const data = {
      label: label,
      data: values,
      borderColor: dataSetColor,
      backgroundColor: dataSetColor,
    };
    datasets.push(data);
  });

  let dailyPestTableData = {
    labels: dailyPestCount.data[0].days,
    datasets: datasets,
  };

  const findingsTableData = {
    labels: [
      "Closed: Low Priority",
      "Closed: Critical Priority",
      "Open: Low Priority",
      "Open: Critical Priority",
    ],
    datasets: [
      {
        label: "Findings (Month)",
        data: [
          pieChartFindings.data[0].closelow,
          pieChartFindings.data[0].closecritical,
          pieChartFindings.data[0].openlow,
          pieChartFindings.data[0].opencritical,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const dbData = {
    breachCount:
      breachCount.data[0].data === undefined ? 0 : breachCount.data[0].data,
    findingsCount:
      findingsCount.data[0].findings_for_acknowledgement === undefined
        ? 0
        : findingsCount.data[0].findings_for_acknowledgement,
    acknowledgeCount: Array.isArray(acknowledgeCount.data)
      ? acknowledgeCount.data[0].count
      : 0,
    nextVisit: nextVisit.data.results,
    dailyPestData: dailyPestTableData,
    findingsData: findingsTableData,
    devicesData: devicesData.data,
    criticalFindings: criticalFindings.data,
    pestCountMetrics: pestCountMetrics.data,
  };
  return dbData;
  // console.log(dbData);
}

/**
 * It returns a random rgba() color value
 * @returns A random rgba color.
 */
function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    r().toFixed(1) +
    ")"
  );
}
