// валидация

export const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.input',
  errorClass:'input_error',
  buttonSelector: '.popup__button',
  buttonDisabledClass: 'popup__button_invalid'
}

function disableSubmit (evt, form, config) {
  evt.preventDefault();
  toggleButton(form, config)
}

function enableValidation (config)  {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((form) => {
  form.addEventListener('submit', () => disableSubmit)
  form.addEventListener('input', () => {
    toggleButton(form, config)
  })

  addInputListeners(form, config)
  toggleButton(form, config)
  })
}

function handleFormInput (evt, config) {
  const input = evt.target
  const inputId = input.id
  const errorElement = document.querySelector(`#${inputId}-error`)
  
  if (input.validity.valid) {
    input.classList.remove(config.errorClass)
    errorElement.textContent = ''
  } else {
    input.classList.add(config.errorClass)
    errorElement.textContent = input.validationMessage 
  }
}

export function toggleButton (form, config) {
  const buttonSubmit = form.querySelector(config.buttonSelector)
  const isFormValid = form.checkValidity()
  buttonSubmit.disabled = !isFormValid
  buttonSubmit.classList.toggle(config.buttonDisabledClass, !isFormValid)
  
}

// функция, навешивающая слушатели событий на элементы
function addInputListeners (form, config) {
  const inputList = form.querySelectorAll(config.inputSelector)
  inputList.forEach(function (item){
    item.addEventListener('input', (evt) => {
      handleFormInput(evt,config)
      toggleButton()
    })
  })
}

enableValidation(formValidationConfig)