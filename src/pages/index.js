import './index.css';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {
  initialCards,
  config,
  popupBtnEdit,
  popupBtnAdd,
  templateSelector,
  containerSelector,
  selectorPopupWithImage,
  selectorPopupEdit,
  selectorPopupAdd,
  nameSelector,
  careerSelector
} from "../utils/utils.js";

function createCard(item) {
  const card = new Card(item, templateSelector, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section({
  items: initialCards.reverse(),
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
},
containerSelector);

cardList.renderItems();

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

const popupWithImage = new PopupWithImage(selectorPopupWithImage);

popupWithImage.setEventListeners();

function handleCardClick (link, descr) {
  popupWithImage.open(link, descr);
}

const userInfo = new UserInfo({nameSelector, careerSelector});

const popupEdit = new PopupWithForm({
  selectorPopup: selectorPopupEdit,
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
  }
});

popupEdit.setEventListeners();

const popupAdd = new PopupWithForm({
  selectorPopup: selectorPopupAdd,
  handleFormSubmit: ({place, link}) => {

    cardList.addItem(createCard({
      name: place,
      link: link
    }));
  }
});

popupAdd.setEventListeners();

popupBtnEdit.addEventListener('click', () => {
  popupEdit.setInputValues(userInfo.getUserInfo());
  popupEdit.open();
});

popupBtnAdd.addEventListener('click', () => {
  formValidators['card-form'].resetValidation();
  popupAdd.open();
});



