class Card {
  constructor({name, link}, templateSelector, handleCardClick) {
    this._title = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

    this._deleteCard = this._deleteCard.bind(this);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);

    return cardElement;
  }

  _toggleLike(evt) {
    evt.target.classList.toggle('cards__heart_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.cards__heart').addEventListener('click', (evt) => {
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

    return this._element;
  }
}

export default Card;
