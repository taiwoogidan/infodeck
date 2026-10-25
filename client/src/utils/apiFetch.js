
const API_URL = import.meta.env.VITE_SERVER;

// Prevent multiple simultaneous requests from refreshing the token
// independently.
let refreshPromise = null;

async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_URL}/api/auth/infodeck-refresh`, {
      method: "POST",
      credentials: "include",
    }).finally(() => {
      refreshPromise = null;
    });
  }

  try {
    const response = await refreshPromise;
    return response.ok;
  } catch (error) {
    console.error("Token refresh request failed:", error);
    return false;
  }
}

export async function apiFetch(url, options = {}) {
  // Send the original request with cookies.
  const response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  // Only attempt a refresh after an unauthorized response.
  if (response.status !== 401) {
    return response;
  }

  // Ask the backend to validate the refresh-token cookie and
  // issue a new access token.
  const refreshed = await refreshAccessToken();

  if (!refreshed) {
    return response;
  }

  // Retry the original request once with the newly issued cookie.
  // The browser attaches the updated cookie automatically.
  return fetch(url, {
    ...options,
    credentials: "include",
  });
}
