export default class Popup {
  constructor({popupSelector}) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButtonElement = this._popupElement.querySelector('.popup__close-btn');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._closeButtonElement.addEventListener('click', this.close.bind(this));
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}