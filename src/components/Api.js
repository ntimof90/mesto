export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    });
  }

  editUserInfo({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, about})
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
  }

  editAvatar({avatar}) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar})
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
  }

  addCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, link})
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
  }

  deleteCard({id}) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({id})
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
  }

  likeCard({id}) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify({id})
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
  }

  unlikeCard({id}) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({id})
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
  }
}