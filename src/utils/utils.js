export const config = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  };

export const popupBtnEdit = document.querySelector('.profile__button-edit');
export const popupBtnAdd = document.querySelector('.profile__button-add');
export const popupBtnAvatar = document.querySelector('.profile__image-edit');


export const selectors = {
  templateSelector: '#card',
  containerSelector: '.cards__items',
  selectorPopupWithImage: '.popup_img',
  selectorPopupEdit: '.popup_edit',
  selectorPopupAdd: '.popup_add',
  nameSelector: '.profile__title',
  careerSelector: '.profile__subtitle',
  imageSelector: '.profile__image',
  selectorPopupAvatarEdit: '.popup_edit-avatar',
  selectorPopupDeleteCard: '.popup_delete-card'
};

export const {
  templateSelector,
  containerSelector,
  selectorPopupWithImage,
  selectorPopupEdit,
  selectorPopupAdd,
  nameSelector,
  careerSelector,
  imageSelector,
  selectorPopupAvatarEdit,
  selectorPopupDeleteCard
} = {...selectors};

export const token = 'a74fa796-219d-49f6-bd95-845d7cb5bd76';
const id = 'cohort-61';
export const baseUrl = `https://nomoreparties.co/v1/${id}`;
