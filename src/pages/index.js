import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';
import { validationConfig } from '../utils/constants.js';

const cards = {};

const editButton = document.querySelector('.profile__edit-btn');

const addButton = document.querySelector('.profile__add-btn');

const avatarButton = document.querySelector('.profile__avatar-button');

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
    function makeRequest() {
      return api.editUserInfo({
        name: formData.name,
        about: formData.job
      })
      .then((data) => {
        userInfo.setUserInfo(data);
      });
    }
    handleSubmit(makeRequest, popupWithEditForm);
  }
});

const popupWithAvatarForm = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (formData) => {
    function makeRequest() {
      return api.editAvatar({avatar: formData.avatar})
      .then((data) => userInfo.setAvatar(data));
    }
    handleSubmit(makeRequest, popupWithAvatarForm);
  }
});

const popupWithImage = new PopupWithImage({
  popupSelector: '.popup_type_image'
});

const popupWithAddForm = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (formData) => {
    function makeRequest() {
      return api.addCard(formData)
      .then((data) => {
        renderCard(data);
      })
    }
    handleSubmit(makeRequest, popupWithAddForm, 'Создание...');
  }
});

const popupWithConfirmation = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete',
  handleConfirmationSubmit: (cardId) => {
    function makeRequest() {
      return api.deleteCard({id: cardId})
      .then(() => {
        cards[cardId].delete();
      });
    }
    handleSubmit(makeRequest, popupWithConfirmation, 'Подождите...');
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

function handleSubmit(request, popupInstance, loadingText = "Сохранение...") {
  popupInstance.renderLoading(true, loadingText);
  request()
  .then(() => {
    popupInstance.close();
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    popupInstance.renderLoading(false);
  })
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cardsData]) => {
  userInfo.setUserInfo(userData);
  userInfo.setAvatar(userData);
  cardList.renderItems(cardsData);
})
.catch((error) => {
  console.log(error);
});

// ВАЛИДАЦИЯ ФОРМ:

forms.forEach((form) => {
  setFormValidation(form);
});


