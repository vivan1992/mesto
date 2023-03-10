import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor({selectorPopup, handleFormSubmit}) {
    super(selectorPopup);
    this._handleFormSubmit = handleFormSubmit;

    this._form = this._popup.querySelector('.form');
    this._button = this._form.querySelector('.form__button');
  }

  getDeleteCard(card, element) {
    this._card = card;
    this._element = element;
  }

  loading(content) {
    this._button.textContent = content;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._card, this._element);
    });
    super.setEventListeners();
  }
}
