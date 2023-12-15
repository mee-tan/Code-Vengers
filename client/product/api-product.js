import queryString from "query-string";
const createProduct = async (product) => {
  try {
    let response = await fetch("/api/products/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Network issue ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: "error creating products" };
  }
};

const read = async (params, signal) => {
  try {
    const abortController = new AbortController();
    const abortSignal = abortController.signal;

    let response = await fetch("/api/products/" + params.productId, {
      method: "GET",
      signal: abortSignal,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const update = async (params, credentials, product) => {
  try {
    console.log("Updating product with data:", product);

    let response = await fetch(`/api/products/${params.productId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify(product),
    });

    console.log("Response from server:", response);

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch("/api/products/" + params.productId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const list = async (signal) => {
  try {
    let response = await fetch("/api/products/", {
      method: "GET",
      signal: signal,
    });
    if (!response.ok) {
      throw new Error("Network issue");
    }

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: "error finding products" };
  }
};
export { createProduct, read, update, remove, list };
