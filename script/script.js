const popup = document.querySelector('.popup');
const closePopUpButton = document.querySelector('.popup__close-button');
const openPopUpButton = document.querySelector('.profile__edit-button');
const form = document.querySelector('.popup__form')
const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__about')
const inputName = document.querySelector('.popup__input-name')
const inputAbout = document.querySelector('.popup__input-about')

const openPopup = function() {
  popup.classList.add('popup_opened')
  inputName.value = profileName.textContent
  inputAbout.value = profileAbout.textContent
}

const closePopup = function() {
  popup.classList.remove('popup_opened')
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup();
}

openPopUpButton.addEventListener('click', openPopup)
closePopUpButton.addEventListener('click', closePopup)
form.addEventListener('submit', handleFormSubmit)