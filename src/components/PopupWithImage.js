import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({popupSelector}) {
    super({popupSelector});
    this._captionElement = this._popupElement.querySelector('.popup__figcaption')
    this._imageElement = this._popupElement.querySelector('.popup__image');
  }
  open({caption, image}) {
    super.open();
    this._captionElement.textContent = caption;
    this._imageElement.src = image;
    this._imageElement.alt = caption;
  }
}