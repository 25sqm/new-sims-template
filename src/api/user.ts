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

export async function addUserRole(
  name: string,
  description: string,
  type: number
) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const bodyContent = `enct=add&user_roles_name=${name}&user_roles_description=${description}&role_type=${type}`;

    const response = await http.post(
      `/api/admin/user/roles/crud`,
      bodyContent,
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function editUserRole(
  id: number,
  name: string,
  description: string,
  type: number
) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const bodyContent = `enct=edit&id=${id}&user_roles_name=${name}&user_roles_description=${description}&role_type=${type}`;

    const response = await http.post(
      `/api/admin/user/roles/crud`,
      bodyContent,
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function deleteUserRole(roleId: number) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const bodyContent = `enct=delete&id=${roleId}`;

    const response = await http.post(
      `/api/admin/user/roles/crud`,
      bodyContent,
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}
export async function addUserAccess(userId: number, roleId: number) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const bodyContent = `enct=add&user_ID=${userId}&role_inp=${roleId}`;

    const response = await http.post(
      `/api/admin/user/access/crud`,
      bodyContent,
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function editUserAccess(userId: number, roleId: number) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const bodyContent = `enct=edit&id=${userId}&role_inp=${roleId}`;

    const response = await http.post(
      `/api/admin/user/access/crud`,
      bodyContent,
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function deleteUserAccess(roleId: number) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const bodyContent = `enct=delete&id=${roleId}`;

    const response = await http.post(
      `/api/admin/user/access/crud`,
      bodyContent,
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function getUsersInfo(area_id?: number) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const response = area_id
      ? await http.get(
          `/api/admin/user/information/search?area_id=${area_id}`,
          headers
        )
      : await http.get("/api/admin/user/information/search", headers);
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function addNewUser({
  inp_name,
  inp_username,
  sex,
  inp_email,
  inp_landline,
  inp_mobile,
  inp_address,
  inp_org = 8,
}: any) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const bodyContent = `enct=add&inp_name=${inp_name}&inp_username=${inp_username}&inp_org=${inp_org}&sex=${sex}&inp_email=${inp_email}&inp_landline=${inp_landline}&inp_mobile=${inp_mobile}&inp_address=${inp_address}`;

    const response = await http.post(
      "/api/admin/user/information/crud",
      bodyContent,
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function editUser({
  id,
  inp_name,
  inp_username,
  sex,
  inp_email,
  inp_landline,
  inp_mobile,
  inp_address,
  inp_org,
}: any) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const bodyContent = `enct=edit&inp_name=${inp_name}&inp_username=${inp_username}&inp_org=${inp_org}&sex=${sex}&inp_email=${inp_email}&inp_landline=${inp_landline}&inp_mobile=${inp_mobile}&inp_address=${inp_address}&id=${id}`;

    const response = await http.post(
      "/api/admin/user/information/crud",
      bodyContent,
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function deleteUser(id: number) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const bodyContent = `enct=delete&id=${id}`;

    const response = await http.post(
      `/api/admin/user/information/crud`,
      bodyContent,
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
export async function addUserPermission(
  roleID: number,
  page_ID: number,
  permission: number
) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const bodyContent = `enct=add&role_ID=${roleID}&page_ID=${page_ID}&permission=${permission}`;

    const response = await http.post(
      `/api/admin/user/roles/permissions/crud`,
      bodyContent,
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function editUserPermission(
  id: number,
  page_ID: number,
  permission: number
) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const bodyContent = `enct=edit&id=${id}&page_ID=${page_ID}&permission=${permission}`;

    const response = await http.post(
      `/api/admin/user/roles/permissions/crud`,
      bodyContent,
      headers
    );
    return response;
  } catch (err: any) {
    console.error(err.response);
    return null;
  }
}

export async function deleteUserPermission(id: number) {
  try {
    const csrf = await http.get("/sanctum/csrf-cookie");
    const authToken = sessionStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${authToken}` } };
    const bodyContent = `enct=delete&id=${id}`;

    const response = await http.post(
      `/api/admin/user/roles/permissions/crud`,
      bodyContent,
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
