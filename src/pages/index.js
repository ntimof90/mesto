import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const initialCards = [
  {
    name: 'Багамские острова',
    link: 'images/element-bahamas.jpg',
  },
  {
    name: 'Красное море',
    link: 'images/element-red-1.jpg',
  },
  {
    name: 'Гавайские острова',
    link: 'images/element-hawaii.jpg',
  },
  {
    name: 'Микронезия',
    link: 'images/element-micronesia.jpg',
  },
  {
    name: 'Тайланд',
    link: 'images/element-thailand.jpg',
  },
  {
    name: 'Красное море',
    link: 'images/element-red-2.jpg',
  }
];
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__form-submit_inactive',
  inputErrorClass: 'popup__form-item_invalid',
  errorClass: 'popup__form-error_active'
};
const cardList = new Section ( {
  items: initialCards,
  renderer: renderCard
}, '.elements');
const popupWithImage = new PopupWithImage({popupSelector: '.popup_type_image'});
const popupWithAddForm = new PopupWithForm({
    popupSelector: '.popup_type_add',
    handleFormSubmit: renderCard
  },
  setFormValidation
);
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle'
});
const popupWithEditForm = new PopupWithForm({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (formData) => {
      userInfo.setUserInfo(formData);
    }
  },
  setFormValidation
);

function createCard(cardData) {
  const card = new Card(cardData, '#element', handleCardClick);
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

cardList.renderItems();
popupWithImage.setEventListeners();
popupWithAddForm.setEventListeners();
popupWithEditForm.setEventListeners();
addButton.addEventListener('click', () => {
  popupWithAddForm.open({name: '', link: ''});
});
editButton.addEventListener('click', () => {
  popupWithEditForm.open(userInfo.getUserInfo());
});