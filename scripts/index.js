import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {initialCards, config} from "./utils.js";

const popupBtnEdit = document.querySelector('.profile__button-edit');
const popupBtnAdd = document.querySelector('.profile__button-add');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupImgPictureScale = document.querySelector('.popup_img');
const popupImg = popupImgPictureScale.querySelector('.popup__img');
const popupDescr = popupImgPictureScale.querySelector('.popup__descr');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];

const nameInput = profileForm.querySelector('.form__input_name_name');
const jobInput = profileForm.querySelector('.form__input_name_career');
const placeInput = cardForm.querySelector('.form__input_name_place');
const linkInput = cardForm.querySelector('.form__input_name_link');

const cardContainer = document.querySelector('.cards__items');

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

function fillPopupEditInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function createCard(config, templateSelector) {
  const cardElement = new Card(config, templateSelector, handleCardClick);

  return cardElement;
}

function addCard(config, templateSelector) {
  cardContainer.prepend(createCard(config, templateSelector).generateCard());
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEdit);
}

function handleAddCardSubmit (evt) {
  evt.preventDefault();
  const data = {
    name: placeInput.value,
    link: linkInput.value
  };
  addCard(data, '#card');
  closePopup(popupAdd);
}

function handleCardClick (link, descr) {
  popupImg.src = link;
  popupImg.alt = descr;
  popupDescr.textContent = descr;
  openPopup(popupImgPictureScale);
}

popupBtnEdit.addEventListener('click', () => {
  fillPopupEditInputs();
  openPopup(popupEdit);
});

popupBtnAdd.addEventListener('click', () => {
  cardForm.reset();
  formValidators['card-form'].resetValidation();
  openPopup(popupAdd);
});

popups.forEach(item => {
  item.addEventListener('click', (evt) => {
    if (evt.target === item || evt.target.classList.contains('popup__close')) {
      closePopup(item);
    }
  });
});

profileForm.addEventListener('submit', handleEditFormSubmit);
cardForm.addEventListener('submit', handleAddCardSubmit);


initialCards.reverse().forEach(item => {
  addCard(item, '#card');
});

