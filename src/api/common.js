export const BASE_URL = "http://localhost:5000";

const prepareResponse = (response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
};

const toJson = (res) => res.json();

const createHeaders = () => ({
  "Content-Type": "application/json",
});

const get = (endpoint) => {
  return fetch(`${BASE_URL}/${endpoint}`).then(prepareResponse).then(toJson);
};

const post = (endpoint, body) => {
  return fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: createHeaders(),
  })
    .then(prepareResponse)
    .then(toJson);
};

const patch = (endpoint, body) => {
  return fetch(`${BASE_URL}/${endpoint}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: createHeaders(),
  })
    .then(prepareResponse)
    .then(toJson);
};

const remove = (endpoint) => {
  return fetch(`${BASE_URL}/${endpoint}`, {
    method: "DELETE",
  })
    .then(prepareResponse)
    .then(toJson);
};

export const client = {
  get,
  post,
  patch,
  remove,
};
