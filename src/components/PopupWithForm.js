import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super({popupSelector});
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__form-item');
    this._submitButton = this._formElement.querySelector('.popup__form-submit');
    this._submitButtonDefaultText = this._submitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  open(inputValues) {
    super.open();
    this._inputList.forEach(input => {
      input.value = inputValues[input.name];
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  renderLoading(isLoading, loadingText) {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonDefaultText;
    }
  }
}