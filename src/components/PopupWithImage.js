import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(selectorPopup) {
    super(selectorPopup);

    this._popupImg = this._popup.querySelector('.popup__img');
    this._popupDescr = this._popup.querySelector('.popup__descr');
  }

  open(link, descr) {
    this._popupImg.src = link;
    this._popupImg.alt = descr;
    this._popupDescr.textContent = descr;
    super.open();
  }
}

