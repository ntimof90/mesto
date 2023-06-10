let editButton = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-btn');
editButton.addEventListener('click', function() {
  let profileTitle = document.querySelector('.profile__title');
  let profileSubtitle = document.querySelector('.profile__subtitle');
  document.querySelector('.popup__form-item_el_title').value = profileTitle.textContent;
  document.querySelector('.popup__form-item_el_subtitle').value = profileSubtitle.textContent;
  popup.classList.add('popup_opened');
});
closeButton.addEventListener('click', function(){
  popup.classList.remove('popup_opened');
});
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__form-item_el_title');
let jobInput = formElement.querySelector('.popup__form-item_el_subtitle');
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}
formElement.addEventListener('submit', handleFormSubmit);

let likeButton = document.querySelectorAll('.element__like-btn');
for (let i = 0; i <= likeButton.length; i++) {
  likeButton[i].addEventListener('click', function() {
    likeButton[i].classList.toggle('element__like-btn_active');
  });
}
