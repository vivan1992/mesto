const popupBtnOpen = document.querySelector('.profile__button-edit');
const popupBtnClose = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_name_name');
const jobInput = formElement.querySelector('.form__input_name_career');

function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popupClose();
}

popupBtnOpen.addEventListener('click', popupOpen);
popupBtnClose.addEventListener('click', popupClose);
formElement.addEventListener('submit', handleFormSubmit);
