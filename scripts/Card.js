import { openPopup } from "./index.js";
export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._isLiked = false;
    this._templateSelector = templateSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }
  _setEventListeners() {
    this._element
      .querySelector(".element__like-btn")
      .addEventListener("click", () => {
        this._like();
      });
    this._element
      .querySelector(".element__del-btn")
      .addEventListener("click", () => {
        this._delete();
      });
    this._element
      .querySelector(".element__photo")
      .addEventListener("click", () => {
        this._toFullScreen();
      });
  }
  _like() {
    this._element
      .querySelector(".element__like-btn")
      .classList.toggle("element__like-btn_active");
    this._isLiked = !this._isLiked;
  }
  _delete() {
    this._element.remove();
  }
  _toFullScreen() {
    const imagePopup = document.querySelector(".popup_type_image");
    openPopup(imagePopup);
    imagePopup.querySelector(".popup__image").src = this._link;
    imagePopup.querySelector(".popup__figcaption").textContent = this._name;
    imagePopup.querySelector(".popup__image").alt = this._name;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".element__photo").src = this._link;
    this._element.querySelector(".element__title").textContent = this._name;
    return this._element;
  }
}
