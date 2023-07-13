export class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._errorClass = config.errorClass;
    this._buttonSelector = config.buttonSelector;
    this._form = form;
    this._inputList = this._form.querySelectorAll(this._inputSelector);
    this._buttonSubmit = this._form.querySelector(this._buttonSelector);
    this._buttonDisabledClass = config.buttonDisabledClass;
  }

  disableSubmit(evt) {
    evt.preventDefault();
    this.toggleButton();
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      this.disableSubmit(evt);
    });
    this.addInputListeners();
    this.toggleButton();
  }

  handleFormInput(evt) {
    const input = evt.target;
    const inputId = input.id;
    const errorElement = document.querySelector(`#${inputId}-error`);

    if (input.validity.valid) {
      input.classList.remove(this._errorClass);
      errorElement.textContent = "";
    } else {
      input.classList.add(this._errorClass);
      errorElement.textContent = input.validationMessage;
    }
  }

  toggleButton() {
    const isFormValid = this._form.checkValidity();
    const isButtonDisabled = this._buttonSubmit.disabled;

    if (isFormValid && isButtonDisabled) {
      this._buttonSubmit.disabled = false;
      this._buttonSubmit.classList.remove(this._buttonDisabledClass);
    } else if (!isFormValid && !isButtonDisabled) {
      this._buttonSubmit.disabled = true;
      this._buttonSubmit.classList.add(this._buttonDisabledClass);
    }
  }

  addInputListeners() {
    this._inputList.forEach((item) => {
      item.addEventListener("input", (evt) => {
        this.handleFormInput(evt);
        // this.toggleButton();
      });
    });
  }

  hideError(input) {
    const inputId = input.id;
    const errorElement = document.querySelector(`#${inputId}-error`);

    input.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  resetValidation() {
    this.toggleButton();

    this._inputList.forEach((inputElement) => {
      this.hideError(inputElement);
    });
  }
}
