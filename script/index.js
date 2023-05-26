import { initialCards } from "./constants.js";
import {formValidationConfig} from './validation.js'
import { toggleButton } from "./validation.js";
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
const templateCard = document.querySelector("#template-card").content.querySelector(".card__item");

const escKeyCode = 27;

const popupImg = document.querySelector(".popup-image");
const photoImg = popupImg.querySelector(".popup-image__photo");
const closeButtonImg = popupImg.querySelector(".popup-image__close-button");
const infoImg = popupImg.querySelector(".popup-image__info");

closeButtonImg.addEventListener("click", () => {
  closePopup(popupImg);
});

const createCard = (dataCard) => {
  // создали карточку клонированием и присвоили новые значения из dataCard
  const cloneCard = templateCard.cloneNode(true);
  const title = cloneCard.querySelector(".card__title");
  const image = cloneCard.querySelector(".card__image");
  title.textContent = dataCard.name;
  image.src = dataCard.link;
  image.alt = dataCard.name;

  image.addEventListener("click", function (evt) {
    evt.preventDefault();
    infoImg.textContent = dataCard.name;
    photoImg.src = dataCard.link;
    photoImg.alt = dataCard.name;
    openPopup(popupImg);
  });

  // Нашли кнопку удаления в клоне карточки  и навесили событие удаления
  const buttonDelete = cloneCard.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", () =>
    cloneCard.remove()
  );


  const likeButton = cloneCard.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-image_active");
  });
  return cloneCard;
};

const addCard = (list, dataCard) => {
  const newCard = createCard(list, dataCard);
  list.prepend(newCard);
};

popupAddForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const cardTitle = inputCardName.value;
  const cardLink = inputCardLink.value;

  const newCard = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };
  cardsList.prepend(createCard(cardsList, newCard));
  closePopup(popupAdd);
  popupAddForm.reset()
  toggleButton(popupAddForm, formValidationConfig)
});

//открытие попапа редактирования профиля и сохранение введенных значений в профиль
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

// функция открытия попапа
const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handlePressEsc);
  popup.addEventListener('mousedown', closeOverlayPopup)
};

// функция закрытия попапа
const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handlePressEsc)
  popup.removeEventListener('mousedown', closeOverlayPopup)
  
};

// Функция закрытия попапа на оверлей
const closeOverlayPopup = function (evt) {
  const target = evt.target
  const checkResult = checkPopupOpenedClass(target.className)
  console.log(target.className)
  if (target == evt.currentTarget && checkResult) {
    closePopup(target)
  }
  console.log(target, evt.currentTarget)
}

// проверка на класс popup_opened
function checkPopupOpenedClass (data) {
  const re = data.split(" ")
  console.log(re)
  return data.includes('popup_opened')
}

// функция для слушателя событий формы попапа редактирования профиля
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

initialCards.forEach((card) => {
  addCard(cardsList, card);
});