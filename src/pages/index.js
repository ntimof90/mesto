import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';

const cards = {};

const editButton = document.querySelector('.profile__edit-btn');

const addButton = document.querySelector('.profile__add-btn');

const avatarButton = document.querySelector('.profile__avatar-button');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__form-submit_inactive',
  inputErrorClass: 'popup__form-item_invalid',
  errorClass: 'popup__form-error_active'
};

const forms = Array.from(document.querySelectorAll('.popup__form'));

// СЕКЦИЯ ДЛЯ КАРТОЧЕК:

const cardList = new Section ({
  renderer: renderCard,
  containerSelector: '.elements'
});

// ИНФО О ПОЛЬЗОВАТЕЛЕ:

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
});

// ЗАПРОСЫ К СЕРВЕРУ:

const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-74',
  headers: {
    authorization: '3b36480d-2158-4457-b63e-d0b1b81776e3',
    'Content-Type': 'application/json'
  }
});

// ПОПАПЫ:

const popupWithEditForm = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (formData) => {
    popupWithEditForm._submitButton.textContent = 'Сохранение...';
    popupWithEditForm._submitButton.classList.add('popup__form-submit_inactive');
    api.editUserInfo({
      name: formData.name,
      about: formData.job
    })
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupWithEditForm.close();
      popupWithEditForm._submitButton.textContent = 'Сохранить';
      popupWithEditForm._submitButton.classList.remove('popup__form-submit_inactive');
    });
  }
});

const popupWithAvatarForm = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (formData) => {
    popupWithAvatarForm._submitButton.textContent = 'Сохранение...';
    popupWithAvatarForm._submitButton.classList.add('popup__form-submit_inactive');
    api.editAvatar({avatar: formData.avatar})
    .then((data) => {
      userInfo.setAvatar(data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupWithAvatarForm.close();
      popupWithAvatarForm._submitButton.textContent = 'Сохранить';
      popupWithAvatarForm._submitButton.classList.remove('popup__form-submit_inactive');
    })
  }
});

const popupWithImage = new PopupWithImage({
  popupSelector: '.popup_type_image'
});

const popupWithAddForm = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (formData) => {
    popupWithAddForm._submitButton.textContent = 'Создание...';
    popupWithAddForm._submitButton.classList.add('popup__form-submit_inactive');
    api.addCard(formData)
    .then((data) => {
      renderCard(data);
    })
    .finally(() => {
      popupWithAddForm.close();
      popupWithAddForm._submitButton.textContent = 'Создать';
      popupWithAddForm._submitButton.classList.remove('popup__form-submit_inactive');
    })
  }
});

const popupWithConfirmation = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete',
  handleConfirmationSubmit: (cardId) => {
    popupWithConfirmation._submitButton.textContent = "Подождите...";
    popupWithConfirmation._submitButton.classList.add('popup__form-submit_inactive');
    api.deleteCard({id: cardId})
    .then(() => {
      cards[cardId].delete();
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      popupWithConfirmation.close();
      popupWithConfirmation._submitButton.textContent = "Да";
      popupWithConfirmation._submitButton.classList.remove('popup__form-submit_inactive');
    })
  }
});

// ФУНКЦИИ:

function createCard(cardData) {
  const card = new Card({
    cardDataObject: cardData,
    templateSelector: '#element',
    handleCardClick,
    handleLikeClick: () => {
      if (!card._isLiked) {
        api.likeCard({id: card.cardId})
        .then((data) => {
          card.updateLikesList(data.likes);
          card.updateLikeStatus();
        })
        .catch((error) => {
          console.log(error);
        })
      } else {
        api.unlikeCard({id: card.cardId})
        .then((data) => {
          card.updateLikesList(data.likes);
          card.updateLikeStatus();
        })
        .catch((error) => {
          console.log(error);
        })
      }
    },
    handleDeleteClick: () => {
      popupWithConfirmation.passId(card.cardId);
      popupWithConfirmation.open();
    },
    userId: userInfo.id
  });
  cards[card.cardId] = card;
  return card.generateCard();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardList.addItem(cardElement);
}

function handleCardClick(name, link) {
  popupWithImage.open({caption: name, image: link});
}

function setFormValidation(formElement) {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
}

// УСТАНОВКА СЛУШАТЕЛЕЙ

popupWithImage.setEventListeners();
popupWithAddForm.setEventListeners();
popupWithEditForm.setEventListeners();
popupWithConfirmation.setEventListeners();
popupWithAvatarForm.setEventListeners();
addButton.addEventListener('click', () => {
  popupWithAddForm.open({name: '', link: ''});
});
editButton.addEventListener('click', () => {
  popupWithEditForm.open(userInfo.getUserInfo());
});
avatarButton.addEventListener('click', () => {
  popupWithAvatarForm.open({avatar: ''});
});

// ПОЛУЧЕНИЕ НАЧАЛЬНЫХ ДАННЫХ:

api.getUserInfo()
.then((data) => {
  userInfo.setUserInfo(data);
  userInfo.setAvatar(data);
})
.catch((error) => {
  console.log(error);
});

api.getInitialCards()
.then((data) => {
  cardList.renderItems(data);
})
.catch((error) => {
  console.log(error);
});

// ВАЛИДАЦИЯ ФОРМ:

forms.forEach((form) => {
  setFormValidation(form);
});


