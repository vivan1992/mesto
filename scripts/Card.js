class Card {
  constructor(data, templateSelector, fillPopupImageFields, openPopup) {
    this._title = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._fillPopupImageFields = fillPopupImageFields;
    this._openPopup = openPopup;
    this._popupImgPictureScale = document.querySelector('.popup_img');

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

  _likeCard(evt) {
    evt.target.classList.toggle('cards__heart_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.cards__heart').addEventListener('click', (evt) => {
      this._likeCard(evt);
    });
    this._element.querySelector('.cards__delete').addEventListener('click', this._deleteCard);
    this._elementImage.addEventListener('click', () => {
      this._fillPopupImageFields(this._link, this._title);
      this._openPopup(this._popupImgPictureScale);
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
