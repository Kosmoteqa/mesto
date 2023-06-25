import "../pages/index.css";
import { initialCards } from "./constants.js";
import { Card } from "./Card.js";
import { formValidatorAdd, formValidatorEdit } from "./validation.js";

import { PopupWithForm } from "./PopupWithForm";
import { PopupWithImage } from "./PopupWithImage";
import { UserInfo } from "./UserInfo";
import { Section } from "./Section";

const openPopUpInfoButton = document.querySelector(".profile__edit-button");

const popupOpenButtonAdd = document.querySelector(".profile__add-button");
const templateCard = document
  .querySelector("#template-card")
  .content.querySelector(".card__item");

popupOpenButtonAdd.addEventListener("click", () => {
  formValidatorAdd.resetValidation();
  popupFormCard.open();
});

openPopUpInfoButton.addEventListener("click", () => {
  formValidatorEdit.resetValidation();
  popupFormEdit.setInputValues(userinfo.getUserInfo());
  popupFormEdit.open();
});

const openImagePopup = (card) => {
  popupImage.open(card.name, card.link);
};

function createCard(cardData) {
  const card = new Card(cardData, templateCard, openImagePopup);
  const cardElement = card.create();
  return cardElement;
}

const section = new Section(
  {
    renderer: (card) => {
      const cardElement = createCard(card);
      section.addItem(cardElement);
    },
    items: initialCards,
  },
  ".elements__cards-list"
);

const userinfo = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__about",
});

const popupImage = new PopupWithImage({ selector: ".popup-image" });

const popupFormCard = new PopupWithForm({
  selector: ".popup_add",
  submit: (data) => {
    const cardElement = createCard(data);
    section.addItem(cardElement);
    popupFormCard.close();
  },
});

const popupFormEdit = new PopupWithForm({
  selector: ".popup_edit",
  submit: (data) => {
    userinfo.setUserInfo(data);
    popupFormEdit.close();
  },
});

popupImage.setEventListeners();
popupFormCard.setEventListeners();
popupFormEdit.setEventListeners();
section.render();
