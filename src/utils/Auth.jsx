export const BASE_URL = "https://auth.nomoreparties.co";

function _handleResponse(response) {
try {
  if (response.ok) {
    return response.json();
  }
} catch (e) {
  return e;
}
return Promise.reject(response.status);
}

export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(_handleResponse);
};

export const login = (data) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then(_handleResponse);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  .then(_handleResponse);
};
