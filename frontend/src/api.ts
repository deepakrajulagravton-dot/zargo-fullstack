const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function api(path: string, method = "GET", body?: any) {
  const token = localStorage.getItem("zargo_token");
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Request failed");
  }
  return res.json();
}

export const get  = (path: string)              => api(path);
export const post = (path: string, body: any)   => api(path, "POST", body);
export const put  = (path: string, body: any)   => api(path, "PUT", body);
export const del  = (path: string)              => api(path, "DELETE");
