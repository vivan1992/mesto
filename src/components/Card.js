class Card {
  constructor({name, link, likes, owner, _id}, currentUserId, templateSelector, handleCardClick, handleLikeClick, handleDeleteIconClick) {
    this._title = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._id = _id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;

    this._isOwner = owner._id === currentUserId;

    this._likeState = this._likes.some(obj => obj._id === currentUserId);

    this._deleteCard = this._deleteCard.bind(this);
    this._updateLikeCounter = this._updateLikeCounter.bind(this);
    this. _updateLikeState = this._updateLikeState.bind(this);
  }

  _getHeartElement() {
    return this._element.querySelector('.cards__heart');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);

    return cardElement;
  }

  _renderLike() {
    if (this._likeState) {
      this._getHeartElement().classList.add('cards__heart_active');
    }
  }

  _updateLikeCounter(likes = this._likes) {
    this._element.querySelector('.cards__like-counter').textContent = likes.length;
  }

  _updateLikeState() {
    this._likeState = !this._likeState;
  }

  _toggleLike(evt) {
    this._handleLikeClick(evt, this._id, this._likeState, this._updateLikeCounter, this._updateLikeState);
  }

  _deleteCard() {
    this._handleDeleteIconClick(this._id, this._element);
  }

  _setEventListeners() {
    this._getHeartElement().addEventListener('click', (evt) => {
      this._toggleLike(evt);
    });
    this._element.querySelector('.cards__delete').addEventListener('click', this._deleteCard);
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._title);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.cards__image');
    this._setEventListeners();

    this._element.querySelector('.cards__title').textContent = this._title;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._title;
    this._updateLikeCounter();
    this._renderLike();
    if (this._isOwner) {
      this._element.querySelector('.cards__delete').classList.add('cards__delete_visible');
    }

    return this._element;
  }
}

export default Card;
