
import { initialCards } from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator} from './validation.js';

const popupEdit = document.querySelector(".popup_edit");
const closePopUpInfoButton = popupEdit.querySelector(".popup__close-button");
const openPopUpInfoButton = document.querySelector(".profile__edit-button");
const formPopupEdit = popupEdit.querySelector(".popup__form-edit");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const inputName = document.querySelector(".popup__input-name");
const inputAbout = document.querySelector(".popup__input-about");

const popupAdd = document.querySelector(".popup_add");
const popupAddForm = popupAdd.querySelector(".popup__form_add");
const inputCardName = popupAdd.querySelector(".popup__input-name_add");
const inputCardLink = document.querySelector(".popup__input-about_add");
const popupCloseButtonAdd = popupAdd.querySelector(".popup__close-button");

const cardsList = document.querySelector(".elements__cards-list");
const popupOpenButtonAdd = document.querySelector(".profile__add-button");
const templateCard = document.querySelector('#template-card').content.querySelector('.card__item')

const popupImg = document.querySelector(".popup-image");
const photoImg = popupImg.querySelector(".popup-image__photo");
const closeButtonImg = popupImg.querySelector(".popup-image__close-button");
const infoImg = popupImg.querySelector(".popup-image__info");

// const createCard = (dataCard, templateCard) => {
//   const card = new Card(dataCard, templateCard);
//   const cardElement = card.create();
//   cardElement.querySelector(".card__image").addEventListener("click", card._handleCardClick.bind(card));
//   return cardElement;
// }

closeButtonImg.addEventListener("click", () => {
closePopup(popupImg);
});

popupAddForm.addEventListener("submit", (event) => {
event.preventDefault();
const cardTitle = inputCardName.value;
const cardLink = inputCardLink.value;

const newCard = {
name: inputCardName.value,
link: inputCardLink.value,
};
const card = new Card(newCard, templateCard, openImagePopup);
const cardElement = card.create();
cardsList.prepend(cardElement);
closePopup(popupAdd);
popupAddForm.reset();
toggleButton(popupAddForm, formValidationConfig);
});

const openImagePopup = (card) => {
  popupImg.src = card.link;
  popupImg.alt = card.name;
  infoImg.textContent = card.name;
  card._handleCardClick()
  openPopup(popupImg);
};

const openPopupProfileInfo = function () {
openPopup(popupEdit);
inputName.value = profileName.textContent;
inputAbout.value = profileAbout.textContent;
};

const handlePressEsc = (evt) => {
if (evt.key === 'Escape') {
const activePopup = document.querySelector(".popup_opened");
closePopup(activePopup);
}
};

const openPopup = function (popup) {
popup.classList.add("popup_opened");
document.addEventListener("keydown", handlePressEsc);
popup.addEventListener('mousedown', closeOverlayPopup);
};



const closePopup = function (popup) {
popup.classList.remove("popup_opened");
document.removeEventListener("keydown", handlePressEsc);
popup.removeEventListener('mousedown', closeOverlayPopup);
};

const closeOverlayPopup = function(evt) {
if (evt.target.classList.contains('popup_opened')) {
closePopup(evt.target);
}
};

function handleFormSubmitProfile(evt) {
evt.preventDefault();
profileName.textContent = inputName.value;
profileAbout.textContent = inputAbout.value;
closePopup(popupEdit);
}

openPopUpInfoButton.addEventListener("click", openPopupProfileInfo);
closePopUpInfoButton.addEventListener("click", () => {
closePopup(popupEdit);
});

formPopupEdit.addEventListener("submit", handleFormSubmitProfile);

popupOpenButtonAdd.addEventListener("click", () => {
openPopup(popupAdd);
});

popupCloseButtonAdd.addEventListener("click", () => {
closePopup(popupAdd);
});

initialCards.forEach((cardData) => {
const card = new Card(cardData, templateCard);
const cardElement = card.create();
cardsList.appendChild(cardElement);
});  