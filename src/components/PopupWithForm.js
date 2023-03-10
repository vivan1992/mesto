import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({selectorPopup, handleFormSubmit}) {
    super(selectorPopup);
    this._handleFormSubmit = handleFormSubmit;

    this._form = this._popup.querySelector('.form');
    this._button = this._form.querySelector('.form__button');
    this._inputList = Array.from(this._form.querySelectorAll('.form__input'));
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  loading(content) {
    this._button.textContent = content;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}
