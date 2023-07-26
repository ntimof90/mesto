import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const editButton = document.querySelector('.profile__edit-btn');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const editPopup = document.querySelector('.popup_type_edit');
const profileFormElement = document.forms['profile-form'];
const nameInput = profileFormElement.querySelector('.popup__form-item_el_title');
const jobInput = profileFormElement.querySelector('.popup__form-item_el_subtitle');
const closeButtonList = document.querySelectorAll('.popup__close-btn');
const addButton = document.querySelector('.profile__add-btn');
const addPopup = document.querySelector('.popup_type_add');
const cardFormElement = document.forms['card-form'];
const imgInput = cardFormElement.querySelector('.popup__form-item_el_img');
const placeInput = cardFormElement.querySelector('.popup__form-item_el_title');
const cardSection = document.querySelector('.elements');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupFigure = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__figcaption');
const forms = Array.from(document.querySelectorAll('.popup__form'));
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

function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
  item.addEventListener('mousedown', closePopupByOverlay);
}
function handleCardClick(name, link) {
  imagePopupFigure.src = link;
  imagePopupCaption.textContent = name;
  imagePopupFigure.alt = name;
  openPopup(imagePopup);
}
function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
function closePopupByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}
function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
  item.removeEventListener('mousedown', closePopupByOverlay);
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(editPopup);
}
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const inputCardData = { name: placeInput.value, link: imgInput.value };
  renderCard(inputCardData);
  closePopup(addPopup);
}
function createCard(cardData) {
  const card = new Card(cardData, '#element', handleCardClick);
  return card.generateCard();
}
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.prepend(cardElement);
}
function setFormValidation(formElement) {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
}

editButton.addEventListener('click', () => {
  openPopup(editPopup);
  nameInput.defaultValue = profileTitle.textContent;
  jobInput.defaultValue = profileSubtitle.textContent;
  profileFormElement.reset();
});
closeButtonList.forEach((item) => {
  item.addEventListener('click', () => {
    closePopup(item.closest('.popup'));
  });
});
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
addButton.addEventListener('click', () => {
  openPopup(addPopup);
  cardFormElement.reset();
});
initialCards.forEach(renderCard);
cardFormElement.addEventListener('submit', handleCardFormSubmit);
forms.forEach(setFormValidation);
