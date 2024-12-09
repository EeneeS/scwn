const _URL = "http://localhost:3000";

/**
 * @param {string} url 
 * @param {string} method 
 */
export async function api(url, method = "GET", body = null, headers = {}) {
  try {

    const config = {
      method,
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${localStorage.getItem("idToken")}`,
        ...headers
      }
    };

    if (body && ["POST", "PATCH", "PUT"].includes(method.toUpperCase())) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${_URL}${url}`, config);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
    }

    return await response.json();

  } catch (error) {
    console.error("API request failed", error);
    throw error;
  }
}
