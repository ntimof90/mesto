export default class Card {
  constructor({cardDataObject, templateSelector, handleCardClick, handleLikeClick, handleDeleteClick, userId}) {
    this._name = cardDataObject.name;
    this._link = cardDataObject.link;
    this._likedUsers = cardDataObject.likes;
    this._cardOwnerId = cardDataObject.owner._id;
    this.cardId = cardDataObject._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._userId = userId;
    this._isMine = (this._userId === this._cardOwnerId);
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
    if (this._deleteButton) {
      this._deleteButton.addEventListener('click', () => {
        this._requestDelete();
      });
    }
    this._cardImageElement.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });
  }

  updateLikeStatus() {
    this._isLiked = this._likedUsers.some((likedUser) => {
      return likedUser._id === this._userId;
    });
    if (this._isLiked) {
      this._likeButton.classList.add('element__like-btn_active');
    } else {
      this._likeButton.classList.remove('element__like-btn_active');
    }
    this._likesCountElement.textContent = this._likedUsers.length;
  }

  updateLikesList(arr) {
    this._likedUsers = arr;
  }

  _like() {
    this._handleLikeClick();
  }

  _requestDelete() {
    this._handleDeleteClick();
  }

  delete() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImageElement = this._element.querySelector('.element__photo');
    this._cardTitleElement = this._element.querySelector('.element__title');
    this._likeButton = this._element.querySelector('.element__like-btn');
    this._deleteButton = this._element.querySelector('.element__del-btn');
    this._likesCountElement = this._element.querySelector('.element__like-count');
    this._cardImageElement.src = this._link;
    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.alt = this._name;
    if (!this._isMine) {
      this._deleteButton.remove();
    }
    this.updateLikeStatus();
    this._setEventListeners();
    return this._element;
  }
}
