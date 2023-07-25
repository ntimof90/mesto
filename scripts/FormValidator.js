export class FormValidator {
  constructor(validationSettings, formElement) {
    this._formSelector = validationSettings.formSelector;
    this._inputSelector = validationSettings.inputSelector;
    this._submitButtonSelector = validationSettings.submitButtonSelector;
    this._inactiveButtonClass = validationSettings.inactiveButtonClass;
    this._inputErrorClass = validationSettings.inputErrorClass;
    this._errorClass = validationSettings.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    this._formSubmit = formElement.querySelector(validationSettings.submitButtonSelector);
  }
  _setEventListeners() {
    this._formElement.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
      this._formElement.addEventListener("reset", () => {
        this._hideInputError(inputElement);
      });
    });
  }
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._formSubmit.classList.add(this._inactiveButtonClass);
      this._formSubmit.disabled = true;
    } else {
      this._formSubmit.classList.remove(this._inactiveButtonClass);
      this._formSubmit.disabled = false;
    }
  }
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  enableValidation() {
    this._setEventListeners();
  }
}
