export default class Api {
  constructor({baseUrl, headers}) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _request(path, method = 'GET', body = null) {
    return fetch(this._url + path, {method, headers: this._headers, body})
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getInitialCards() {
    return this._request('/cards');
  }

  postCard(body) {
    return this._request('/cards', 'POST', JSON.stringify(body));
  }

  getUserInfo() {
    return this._request('/users/me');
  }

  setUserInfo(body) {
    return this._request('/users/me', 'PATCH', JSON.stringify(body));
  }

  addCard(body) {
    return this._request('/cards', 'POST', JSON.stringify(body));
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, 'DELETE');
  }

  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, 'PUT');
  }

  dislikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, 'DELETE');
  }

  updateUserAvatar(body) {
    return this._request('/users/me/avatar', 'PATCH', JSON.stringify(body));
  }
}
