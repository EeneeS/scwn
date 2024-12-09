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
      if (response.status === 401) {
        // TODO: show login screen
        console.log('unauthorized');
      };
      throw new Error(JSON.parse(errorBody).error);
    }

    return await response.json();

  } catch (error) {
    console.error("API request failed", error);
    throw error;
  }
}
