import './index.css';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api';
import PopupWithConfirmation from '../components/PopupWithConfirmation';

import {
  config,
  popupBtnEdit,
  popupBtnAdd,
  templateSelector,
  containerSelector,
  selectorPopupWithImage,
  selectorPopupEdit,
  selectorPopupAdd,
  nameSelector,
  careerSelector,
  imageSelector,
  selectorPopupAvatarEdit,
  popupBtnAvatar,
  selectorPopupDeleteCard,
  token,
  baseUrl
} from "../utils/utils.js";

const api = new Api({
  baseUrl: baseUrl,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({nameSelector, careerSelector, imageSelector});

const cardList = new Section({
  renderer: (item, currentUserId) => {
    cardList.addItem(createCard(item, currentUserId));
  }},
  containerSelector
);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, items]) => {
    userInfo.setUserInfo({name: data.name, about: data.about});
    userInfo.setUserAvatar({avatar: data.avatar});
    userInfo.setUserId({_id: data._id});
    cardList.renderItems(items, data._id);
  })
  .catch(err => {
    console.log(err);
  });

function handleLikeClick(evt, id, likeState, updateLikeCounter, updateLikeState) {
  if (!likeState) {
    api.likeCard(id)
    .then(res => {
      updateLikeState();
      evt.target.classList.add('cards__heart_active');
      updateLikeCounter(res.likes);
    })
    .catch(err => console.log(err));
  } else {
    api.dislikeCard(id)
    .then(res => {
      updateLikeState();
      evt.target.classList.remove('cards__heart_active');
      updateLikeCounter(res.likes);
    })
    .catch(err => console.log(err));
  }
}

const popupDeleteCard = new PopupWithConfirmation({
  selectorPopup: selectorPopupDeleteCard,
  handleFormSubmit: (card, element) => {
    popupDeleteCard.loading('Удаление...');
    api.deleteCard(card)
    .then(() => {
      element.remove();
    })
  .catch(err => console.log(err))
  .finally(() => {
    popupDeleteCard.loading('Да');
    popupDeleteCard.close();
  });
  }
});

popupDeleteCard.setEventListeners();

function handleDeleteIconClick(card, element) {
  popupDeleteCard.open();
  popupDeleteCard.getDeleteCard(card, element);
}

function createCard(item, currentUserId) {
  const card = new Card(item, currentUserId, templateSelector, handleCardClick, handleLikeClick, handleDeleteIconClick,);
  const cardElement = card.generateCard();
  return cardElement;
}

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

const popupEdit = new PopupWithForm({
  selectorPopup: selectorPopupEdit,
  handleFormSubmit: (formData) => {
    popupEdit.loading('Сохранение...');
    api.setUserInfo(formData)
    .then(({name, about}) => userInfo.setUserInfo({name, about}))
    .catch(err => console.log(err))
    .finally(() => {
      popupEdit.loading('Сохранить');
      popupEdit.close();
    });
  }
});

popupEdit.setEventListeners();

const popupAvatarEdit = new PopupWithForm({
  selectorPopup: selectorPopupAvatarEdit,
  handleFormSubmit: (formData) => {
    popupAvatarEdit.loading('Сохранение...');
    api.updateUserAvatar(formData)
    .then(res => {
      userInfo.setUserAvatar(res);
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupAvatarEdit.loading('Сохранить');
      popupAvatarEdit.close();
    });
  }
});

popupAvatarEdit.setEventListeners();

const popupAdd = new PopupWithForm({
  selectorPopup: selectorPopupAdd,
  handleFormSubmit: ({place, link}) => {
    popupAdd.loading('Создание...');
    api.postCard({name: place, link: link})
    .then(res => {
      cardList.addItem(createCard(res, userInfo.getUserId()));
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupAdd.loading('Создать');
      popupAdd.close();
    });
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

popupBtnAvatar.addEventListener('click', () => {
  formValidators['avatar-form'].resetValidation();
  popupAvatarEdit.open();
});
