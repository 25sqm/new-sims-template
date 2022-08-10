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

export async function getServiceTypes() {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const response = await http.get("/api/admin/misc/service-type", headers);
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function getSites() {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const response = await http.get("/api/admin/misc/sites", headers);
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

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

export async function addServiceOrder({
  service_type,
  inp_area,
  inp_date,
  inp_timestart,
  inp_timeend,
  inp_user,
}: any) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const bodyContent = `enct=add&service_type=${service_type}&inp_area=${inp_area}&inp_date=${inp_date}&inp_timestart=${inp_timestart}&inp_timeend=${inp_timeend}&inp_user=${inp_user}`;

    const response = await http.post(
      `/api/admin/service-order/crud`,
      bodyContent,
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function editServiceOrder({
  id,
  service_type,
  inp_area,
  inp_date,
  inp_timestart,
  inp_timeend,
  inp_user,
}: any) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const bodyContent = `enct=edit&id=${id}}&service_type=${service_type}&inp_area=${inp_area}&inp_date=${inp_date}&inp_timestart=${inp_timestart}&inp_timeend=${inp_timeend}&inp_user=${inp_user}`;

    const response = await http.post(
      `/api/admin/service-order/crud`,
      bodyContent,
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function deleteServiceOrder(id: number) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const bodyContent = `enct=delete&id=${id}`;

    const response = await http.post(
      `/api/admin/service-order/crud`,
      bodyContent,
      headers
    );
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

export async function getServiceAreas(id: number) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const response = await http.get(
      `/api/admin/service-order/area/search?id=${id}`,
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}
