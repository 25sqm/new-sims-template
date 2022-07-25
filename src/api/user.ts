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
    return err.response;
  }
}

export async function getUserRoles() {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const response = await http.get("/api/admin/user/roles/search", headers);
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function getUsersInfo() {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const response = await http.get(
      "/api/admin/user/information/search",
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function getUserPermissions(id: number) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const response = await http.get(
      `/api/admin/user/roles/permissions/search?id=${id}`,
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function getUserAccess(id: number) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const response = await http.get(
      `/api/admin/user/access/search?id=${id}`,
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function getUserSites(id: number) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const response = await http.get(
      `/api/admin/user/site-assignment/search?id=${id}`,
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
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
    return null;
  }
}
