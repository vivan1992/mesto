const popupBtnEdit = document.querySelector('.profile__button-edit');
const popupBtnAdd = document.querySelector('.profile__button-add');
const popupBtnsClose = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupPictureScale = document.querySelector('.popup_img');
const popupImg = popupPictureScale.querySelector('.popup__img');
const popupDescr = popupPictureScale.querySelector('.popup__descr');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const formProfile = document.querySelector('.form_name_profile');
const formCard = document.querySelector('.form_name_card');
const nameInput = formProfile.querySelector('.form__input_name_name');
const jobInput = formProfile.querySelector('.form__input_name_career');
const placeInput = formCard.querySelector('.form__input_name_place');
const linkInput = formCard.querySelector('.form__input_name_link');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const cardTemplate = document.querySelector('#card').content;
const cardContainer = document.querySelector('.cards__items');

function likeCard(evt) {
  evt.target.classList.toggle('cards__heart_active');
}

function deleteCard(evt) {
  evt.target.parentNode.remove();
}

function clearValueInput() {
  placeInput.value = '';
  linkInput.value = '';
}

function addValueInput() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function popupOpen(element) {
  element.classList.add('popup_opened');
}

function popupClose() {
  popups.forEach(item => {
    item.classList.remove('popup_opened');
  });
  clearValueInput();
}

function createPopupImg (evt) {
  const link = evt.target.src;
  const descr = evt.target.parentNode.querySelector('.cards__title').textContent;
  popupImg.src = link;
  popupDescr.textContent = descr;
}

function addCard(title, link) {
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);

  cardElement.querySelector('.cards__title').textContent = title;
  cardElement.querySelector('.cards__image').src = link;
  cardElement.querySelector('.cards__image').alt = title;

  cardElement.querySelector('.cards__heart').addEventListener('click', likeCard);
  cardElement.querySelector('.cards__delete').addEventListener('click', deleteCard);
  cardElement.querySelector('.cards__image').addEventListener('click', (evt) => {
    createPopupImg(evt);
    popupOpen(popupPictureScale);
  });

  cardContainer.prepend(cardElement);
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popupClose();
}

function handleAddCardSubmit (evt) {
  evt.preventDefault();
  addCard(placeInput.value, linkInput.value);
  popupClose();
}

popupBtnEdit.addEventListener('click', () => {
  addValueInput();
  popupOpen(popupEdit);
});

popupBtnAdd.addEventListener('click', () => {
  popupOpen(popupAdd);
});

popupBtnsClose.forEach(item => {
  item.addEventListener('click', popupClose);
});

formProfile.addEventListener('submit', handleFormSubmit);
formCard.addEventListener('submit', handleAddCardSubmit);

initialCards.reverse().forEach(item => addCard(item.name, item.link));
