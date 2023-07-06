const validationSetup1 = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__form-submit_inactive',
  inputErrorClass: 'popup__form-item_invalid',
  errorClass: 'popup__form-error_active'
};


function showInputError (formElement, inputElement, validationSetup, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSetup.inputErrorClass)
  errorElement.classList.add(validationSetup.errorClass);
  errorElement.textContent = errorMessage;
}
function hideInputError (formElement, inputElement, validationSetup) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSetup.inputErrorClass)
  errorElement.classList.remove(validationSetup.errorClass);
  errorElement.textContent = '';
}
function checkInputValidity (formElement, inputElement, validationSetup) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, validationSetup, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, validationSetup);
  }
}
function setEventListeners (formElement, validationSetup) {
  const inputList = Array.from(formElement.querySelectorAll(validationSetup.inputSelector));
  const formSubmit = formElement.querySelector(validationSetup.submitButtonSelector);
  toggleButtonState(inputList, formSubmit, validationSetup);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationSetup);
      toggleButtonState(inputList, formSubmit, validationSetup);
    });
    formElement.addEventListener('reset', () => {
      hideInputError(formElement, inputElement, validationSetup);
    });
  });
}
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
function toggleButtonState (inputList, buttonElement, validationSetup) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationSetup.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationSetup.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}
function enableValidation (validationSetup) {
  const formList = Array.from(document.querySelectorAll(validationSetup.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationSetup);
  });
}


enableValidation(validationSetup1);