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
  nameInput,
  jobInput,
  templateSelector,
  containerSelector,
  selectorPopupWithImage,
  selectorPopupEdit,
  selectorPopupAdd,
  nameSelector,
  careerSelector
} from "../utils/utils.js";

const cardList = new Section({
  items: initialCards.reverse(),
  renderer: (item) => {
    const card = new Card(item, templateSelector, handleCardClick);

    const cardElement = card.generateCard();

    cardList.addItem(cardElement);
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

function fillPopupEditInputs({name, career}) {
  nameInput.value = name;
  jobInput.value = career;
}

function handleCardClick (link, descr) {
  const popupWithImage = new PopupWithImage(selectorPopupWithImage, link, descr);
  popupWithImage.setEventListeners();
  popupWithImage.open();
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
    const card = new Card({
      name: place,
      link: link
    }, templateSelector, handleCardClick);

    const cardElement = card.generateCard();

    cardList.addItem(cardElement);
  }
});

popupAdd.setEventListeners();

popupBtnEdit.addEventListener('click', () => {
  fillPopupEditInputs(userInfo.getUserInfo());
  popupEdit.open();
});

popupBtnAdd.addEventListener('click', () => {
  formValidators['card-form'].resetValidation();
  popupAdd.open();
});



