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
const btnFormEdit = popupEdit.querySelector('.form__button');
const btnFormAdd = popupAdd.querySelector('.form__button');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const formProfile = document.querySelector('.form_name_profile');
const formCard = document.querySelector('.form_name_card');
const nameInput = formProfile.querySelector('.form__input_name_name');
const jobInput = formProfile.querySelector('.form__input_name_career');
const placeInput = formCard.querySelector('.form__input_name_place');
const linkInput = formCard.querySelector('.form__input_name_link');

const cardContainer = document.querySelector('.cards__items');

function fillPopupEditInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
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

function fillPopupImageFields (link, descr) {
  popupImg.src = link;
  popupImg.alt = descr;
  popupDescr.textContent = descr;
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
  const card = new Card (data, '#card', fillPopupImageFields, openPopup);
  cardContainer.prepend(card.generateCard());
  closePopup(popupAdd);
}

popupBtnEdit.addEventListener('click', () => {
  fillPopupEditInputs();
  btnFormEdit.disabled = false;
  openPopup(popupEdit);
});

popupBtnAdd.addEventListener('click', () => {
  formCard.reset();
  btnFormAdd.disabled = true;
  openPopup(popupAdd);
});

popups.forEach(item => {
  item.addEventListener('click', (evt) => {
    if (evt.target === item || evt.target.classList.contains('popup__close')) {
      closePopup(item);
    }
  });
});

formProfile.addEventListener('submit', handleEditFormSubmit);
formCard.addEventListener('submit', handleAddCardSubmit);


initialCards.reverse().forEach(item => {
  const card = new Card(item, '#card', fillPopupImageFields, openPopup);
  cardContainer.prepend(card.generateCard());
});

const validateFormProfile = new FormValidator(config, formProfile);
validateFormProfile.enableValidation();
const validateFormCard = new FormValidator(config, formCard);
validateFormCard.enableValidation();
