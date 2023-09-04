import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector, handleConfirmationSubmit}) {
    super({popupSelector});
    this._submitButton = this._popupElement.querySelector('.popup__form-submit');
    this._submitButtonDefaultText = this._submitButton.textContent;
    this._handleConfirmationSubmit = handleConfirmationSubmit;
  }
  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', () => {
      this._handleConfirmationSubmit(this._id);
    });
  }

  passId(id) {
    this._id = id;
  }

  renderLoading(isLoading, loadingText) {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonDefaultText;
    }
  }
}