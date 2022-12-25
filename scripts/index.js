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

const formProfile = document.querySelector('.form_name_profile');
const formCard = document.querySelector('.form_name_card');
const nameInput = formProfile.querySelector('.form__input_name_name');
const jobInput = formProfile.querySelector('.form__input_name_career');
const placeInput = formCard.querySelector('.form__input_name_place');
const linkInput = formCard.querySelector('.form__input_name_link');

const cardTemplate = document.querySelector('#card').content.querySelector('.cards__item');
const cardContainer = document.querySelector('.cards__items');

function likeCard(evt) {
  evt.target.classList.toggle('cards__heart_active');
}

function deleteCard(evt) {
  evt.target.closest('.cards__item').remove();
}

function fillPopupEditInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openPopup(element) {
  element.classList.add('popup_opened');
}

function closePopup(element) {
  element.classList.remove('popup_opened');
}

function createPopupImg (link, descr) {
  popupImg.src = link;
  popupImg.alt = descr;
  popupDescr.textContent = descr;
}

function createCard(title, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.cards__image');

  cardElement.querySelector('.cards__title').textContent = title;
  cardElementImage.src = link;
  cardElementImage.alt = title;

  cardElement.querySelector('.cards__heart').addEventListener('click', likeCard);
  cardElement.querySelector('.cards__delete').addEventListener('click', deleteCard);
  cardElementImage.addEventListener('click', () => {
    createPopupImg(link, title);
    openPopup(popupImgPictureScale);
  });

  return cardElement;
}

function addCard(title, link) {
  cardContainer.prepend(createCard(title, link));
}

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEdit);
}

function handleAddCardSubmit (evt) {
  evt.preventDefault();
  addCard(placeInput.value, linkInput.value);
  closePopup(popupAdd);
}

popupBtnEdit.addEventListener('click', () => {
  fillPopupEditInputs();
  openPopup(popupEdit);
});

popupBtnAdd.addEventListener('click', () => {
  formCard.reset();
  openPopup(popupAdd);
});

popups.forEach(item => {
  item.querySelector('.popup__close').addEventListener('click', () => closePopup(item));
});

formProfile.addEventListener('submit', handleEditFormSubmit);
formCard.addEventListener('submit', handleAddCardSubmit);

initialCards.reverse().forEach(item => addCard(item.name, item.link));
