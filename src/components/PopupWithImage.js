import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(selectorPopup, link, descr) {
    super(selectorPopup);
    this._link = link;
    this._descr = descr;

    this._popupImg = this._popup.querySelector('.popup__img');
    this._popupDescr = this._popup.querySelector('.popup__descr');
  }

  open() {
    this._popupImg.src = this._link;
    this._popupImg.alt = this._descr;
    this._popupDescr.textContent = this._descr;
    super.open();
  }
}

