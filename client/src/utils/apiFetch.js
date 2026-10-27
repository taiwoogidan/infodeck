
const API_URL = import.meta.env.VITE_SERVER;

let refreshPromise = null;

async function refreshAccessToken() {
  if (!API_URL) {
    console.error("[Auth] VITE_SERVER is not configured.");
    return false;
  }

  if (!refreshPromise) {
    console.log("[Auth] Starting refresh request...");

    refreshPromise = (async () => {
      try {
        const url = `${API_URL}/api/auth/infodeck-refresh`;

        console.log("[Auth] Refresh URL:", url);

        const response = await fetch(url, {
          method: "POST",
          credentials: "include",
        });

        console.log("[Auth] Refresh status:", response.status);

        const body = await response.clone().text();
        console.log("[Auth] Refresh response body:", body);

        return response.ok;
      } catch (error) {
        console.error("[Auth] Refresh failed:", error);
        return false;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise;
}

export async function apiFetch(url, options = {}) {
  console.log("[API] Sending request:", url);

  const response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  console.log("[API] Initial status:", response.status);

  if (response.status !== 401) {
    return response;
  }

  console.log("[Auth] 401 detected. Refreshing token...");

  const refreshed = await refreshAccessToken();

  console.log("[Auth] Refresh succeeded:", refreshed);

  if (!refreshed) {
    console.warn("[Auth] Refresh failed. Returning original response.");
    return response;
  }

  console.log("[API] Retrying original request:", url);

  const retryResponse = await fetch(url, {
    ...options,
    credentials: "include",
  });

  console.log("[API] Retry status:", retryResponse.status);

  return retryResponse;
}
