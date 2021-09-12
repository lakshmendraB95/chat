import axios from "axios";

export function ajax(route, params = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...params.headers,
  };
  if (params.auth) {
    headers["x-auth-token"] = localStorage.getItem("x-auth-token");
  }

  const method = params.method || "GET";
  return fetch(`http://localhost:8080${route}`, {
    method: params.method || "GET",
    headers: headers,
    body: method !== "GET" ? JSON.stringify(params.body) : undefined,
    credentials: params.credentials || "include",
  }).then((res) => {
    return res.text().then((body) => {
      return {
        body,
        status: res.status,
        headers: {
          "x-auth-token": res.headers.get("x-auth-token"),
        },
      };
    });
  });
}

export function request(route, params = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...params.headers,
  };
  if (params.auth) {
    headers["x-auth-token"] = params.auth;
  }

  const method = params.method || "get";
  return axios(`http://localhost:8080${route}`, {
    method,
    headers: headers,
    data: method !== "get" ? JSON.stringify(params.body) : undefined,
    credentials: params.credentials || "include",
    validateStatus: () => true,
  }).then((res) => {
    return {
      body: res.data,
      status: res.status,
      headers: {
        "x-auth-token": res.headers["x-auth-token"],
      },
    };
  });
}
