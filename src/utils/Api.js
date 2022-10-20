import { apiConfig } from "./constants";

class Api {
  constructor(config) {
    this._config = config;
  }

  _handleResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(
      `${this._config.baseUrl}/users/me`, {
      headers: this._config.headers
    })
      .then(this._handleResponce)
  }

  setNewUserInfo(name, about) {
    return fetch(
      `${this._config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._handleResponce)
  }

  setNewAvatar(userInfo) {
    return fetch(
      `${this._config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._config.headers,
      body: JSON.stringify({
        avatar: userInfo.avatar,
      })
    })
      .then(this._handleResponce)
  }

  getInitialCards() {
    return fetch(
      `${this._config.baseUrl}/cards`, {
      headers: this._config.headers
    }
    )
      .then(this._handleResponce)
  }

  createCard(card) {
    return fetch(
      `${this._config.baseUrl}/cards`, {
      method: 'POST',
      headers: this._config.headers,
      body: JSON.stringify({name: card.name, link: card.link})
    })
      .then(this._handleResponce)
  }

  deleteCardById(id) {
    return fetch(
      `${this._config.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._config.headers
    })
      .then(this._handleResponce)
  }

  likeCard( id, haveNotLiked ) {
    if (haveNotLiked) 
    {
      return fetch(
        `${this._config.baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._config.headers
      })
        .then(this._handleResponce)
    }
     else {
      return fetch(
        `${this._config.baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._config.headers
      })
        .then(this._handleResponce)
    }
  }
}

const api = new Api(apiConfig);

export default api;