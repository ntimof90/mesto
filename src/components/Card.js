export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._isLiked = false;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
        this._like();
      });
    this._deleteButton.addEventListener('click', () => {
        this._delete();
      });
    this._cardImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });
  }

  _like() {
    this._likeButton.classList.toggle('element__like-btn_active');
    this._isLiked = !this._isLiked;
  }

  _delete() {
    this._element.remove();
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__photo');
    this._cardTitle = this._element.querySelector('.element__title');
    this._likeButton = this._element.querySelector('.element__like-btn');
    this._deleteButton = this._element.querySelector('.element__del-btn');
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }
}
