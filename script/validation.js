export class FormValidator {
  constructor(config) {
    this.formSelector = config.formSelector;
    this.inputSelector = config.inputSelector;
    this.errorClass = config.errorClass;
    this.buttonSelector = config.buttonSelector;
    this.buttonDisabledClass = config.buttonDisabledClass;
  }

  disableSubmit(evt, form) {
    evt.preventDefault();
    this.toggleButton(form);
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this.formSelector));
    formList.forEach((form) => {
      form.addEventListener('submit', (evt) => {
        this.disableSubmit(evt, form);
      });

      this.addInputListeners(form);
      this.toggleButton(form);
    });
  }

  handleFormInput(evt) {
    const input = evt.target;
    const inputId = input.id;
    const errorElement = document.querySelector(`#${inputId}-error`);

    if (input.validity.valid) {
      input.classList.remove(this.errorClass);
      errorElement.textContent = '';
    } else {
      input.classList.add(this.errorClass);
      errorElement.textContent = input.validationMessage;
    }
  }

  toggleButton(form) {
    const buttonSubmit = form.querySelector(this.buttonSelector);
    const isFormValid = form.checkValidity();
    buttonSubmit.disabled = !isFormValid;
    buttonSubmit.classList.toggle(this.buttonDisabledClass, !isFormValid);
  }

  addInputListeners(form) {
    const inputList = form.querySelectorAll(this.inputSelector);
    inputList.forEach((item) => {
      item.addEventListener('input', (evt) => {
        this.handleFormInput(evt);
        this.toggleButton(form);
      });
    });
  }
}

const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.input',
  errorClass: 'input_error',
  buttonSelector: '.popup__button',
  buttonDisabledClass: 'popup__button_invalid'
};

const formValidator = new FormValidator(formValidationConfig);
formValidator.enableValidation();
