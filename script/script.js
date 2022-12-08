const popupOpen = document.querySelector('.profile__button-edit');
const popupClose = document.querySelector('.form__close');
const popup = document.querySelector('.popup');

function popupToggle() {
  popup.classList.toggle('popup_opened');
}

popupOpen.addEventListener('click', popupToggle);
popupClose.addEventListener('click', popupToggle);

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__name');
const jobInput = formElement.querySelector('.form__about');

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;
function handleFormSubmit (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popupToggle();
}

formElement.addEventListener('submit', handleFormSubmit);
