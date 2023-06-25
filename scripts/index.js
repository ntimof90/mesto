const editButton = document.querySelector('.profile__edit-btn');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const editPopup = document.querySelector('.popup_type_edit');
const profileFormElement = editPopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__form-item_el_title');
const jobInput = profileFormElement.querySelector('.popup__form-item_el_subtitle');
const closeButtonList = document.querySelectorAll('.popup__close-btn');
const addButton = document.querySelector('.profile__add-btn');
const addPopup = document.querySelector('.popup_type_add');
const cardFormElement = addPopup.querySelector('.popup__form');
const imgInput = cardFormElement.querySelector('.popup__form-item_el_img')
const placeInput = cardFormElement.querySelector('.popup__form-item_el_title');
const cardSection = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element').content;
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupFigure = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__figcaption');


function openPopup (item) {
  item.classList.add('popup_opened');
}
function closePopup (item) {
  item.classList.remove('popup_opened');
}
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(editPopup);
}
function createCard (cardData) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  const cardPhoto = card.querySelector('.element__photo');
  const cardTitle = card.querySelector('.element__title');
  const cardLikeBtn = card.querySelector('.element__like-btn');
  const cardDeleteBtn = card.querySelector('.element__del-btn');
  cardPhoto.src = cardData.link;
  cardTitle.textContent = cardData.name;
  cardPhoto.alt = cardData.name;
  cardLikeBtn.addEventListener('click', () => {
    cardLikeBtn.classList.toggle('element__like-btn_active');
  });
  cardDeleteBtn.addEventListener('click', () => {
    card.remove();
  });
  cardPhoto.addEventListener('click', () => {
    openPopup(imagePopup);
    imagePopupFigure.src = cardData.link;
    imagePopupCaption.textContent = cardData.name;
    imagePopupFigure.alt = cardData.name;
  });
  return card;
}
function renderCard (cardData) {
  const newCard = createCard(cardData);
  cardSection.prepend(newCard);
}
function handleCardFormSubmit (evt) {
  evt.preventDefault();
  const inputCardData = {name: placeInput.value, link: imgInput.value};
  renderCard(inputCardData);
  closePopup(addPopup);
}


initialCards.forEach((item) => {
  renderCard(item);
});
editButton.addEventListener('click', () => {
  openPopup(editPopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});
closeButtonList.forEach((item) => {
  item.addEventListener('click', () => {
    closePopup(item.closest('.popup'));
  });
});
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
addButton.addEventListener('click', () => {
  openPopup(addPopup);
  placeInput.value = '';
  imgInput.value = '';
});
cardFormElement.addEventListener('submit', handleCardFormSubmit);