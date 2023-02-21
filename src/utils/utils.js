export const initialCards = [
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

export const config = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  };

export const popupBtnEdit = document.querySelector('.profile__button-edit');
export const popupBtnAdd = document.querySelector('.profile__button-add');

const profileForm = document.forms["profile-form"];

export const nameInput = profileForm.querySelector('.form__input_name_name');
export const jobInput = profileForm.querySelector('.form__input_name_career');

export const selectors = {
  templateSelector: '#card',
  containerSelector: '.cards__items',
  selectorPopupWithImage: '.popup_img',
  selectorPopupEdit: '.popup_edit',
  selectorPopupAdd: '.popup_add',
  nameSelector: '.profile__title',
  careerSelector: '.profile__subtitle'
};

export const {
  templateSelector,
  containerSelector,
  selectorPopupWithImage,
  selectorPopupEdit,
  selectorPopupAdd,
  nameSelector,
  careerSelector
} = {...selectors};
