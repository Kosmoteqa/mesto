import "../pages/index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm";
import { PopupWithImage } from "../components/PopupWithImage";
import { UserInfo } from "../components/UserInfo";
import { Section } from "../components/Section";
import { PopupWithDelete } from "../components/PopupWithDelete";
import Api from "../components/Api";
import { formValidationConfig } from "../utils/constants";

const openPopUpInfoButton = document.querySelector(".profile__edit-button");

const popupOpenButtonAdd = document.querySelector(".profile__add-button");

const popupOpenButtonAvatar = document.querySelector(".profile__overlay");

const likeButton = document.querySelector(".card__like-button");
const likeCounter = document.querySelectorAll(".card__counter");

const templateCard = document
  .querySelector("#template-card")
  .content.querySelector(".card__item");

const api = new Api({
  url: "https://nomoreparties.co/v1/cohort-70",
  headers: {
    Authorization: "6f58dff0-d5a4-4749-a042-1547f42e122b",
    "Content-type": "application/json",
  },
});

// api
//   .getUserInfo()
//   .then((data) => {
//     userinfo.setUserInfo(data);
//     userinfo.setAvatar(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// api
//   .getAllCards()
//   .then((data) => {
//     console.log(data);
//     section.render(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

  Promise.all([
    api.getUserInfo(),
    api.getAllCards()
  ])
    .then(([userData, initialCards]) => {
      userinfo.setUserInfo(userData);
      userinfo.setAvatar(userData);
      section.render(initialCards);
    })
    .catch((err) => {
      console.log(err);
    });
  

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
  const card = new Card(
    cardData,
    templateCard,
    openImagePopup,
    handleDeleteCard,
    getId,
    (id) => {
      api
        .setLike(id)
        .then((res) => {
          card.setLikesCount(res);
          card.changeLike(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    (id) => {
      api
        .deleteLike(id)
        .then((res) => {
          card.setLikesCount(res);
          card.changeLike(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  );

  const cardElement = card.create();
  return cardElement;
}

function getId() {
  return userinfo.getUserId();
}

const validatorEdit = document.querySelector(".popup__form-edit");
const formValidatorEdit = new FormValidator(
  formValidationConfig,
  validatorEdit
);
formValidatorEdit.enableValidation();

const validatorAdd = document.querySelector(".popup__form_add");
const formValidatorAdd = new FormValidator(formValidationConfig, validatorAdd);
formValidatorAdd.enableValidation();

const avatarForm = document.querySelector(".popup-avatar__form");
const formValidatorAvatar = new FormValidator(formValidationConfig, avatarForm);
formValidatorAvatar.enableValidation();

const section = new Section(
  {
    renderer: (card) => {
      const cardElement = createCard(card);
      section.addItem(cardElement);
    },
  },
  ".elements__cards-list"
);

const userinfo = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
});

const popupImage = new PopupWithImage({ selector: ".popup-image" });

const popupFormCard = new PopupWithForm({
  selector: ".popup_add",
  submit: (data) => {
    popupFormCard.showLoading(true);
    api
      .addNewCard(data)
      .then((res) => {
        const cardElement = createCard(res);
        section.addItem(cardElement);
        popupFormCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupFormCard.showLoading(false);
      });
  },
});

const popupFormEdit = new PopupWithForm({
  selector: ".popup_edit",
  submit: (data) => {
    popupFormEdit.showLoading(true);
    api
      .setUserInfo(data)
      .then((res) => {
        userinfo.setUserInfo(res);
        popupFormEdit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupFormEdit.showLoading(false);
      });
  },
});

const popupAvatar = new PopupWithForm({
  selector: ".popup-avatar",
  submit: (data) => {
    popupAvatar.showLoading(true);
    api
      .setAvatar(data)
      .then((res) => {
        userinfo.setAvatar(res);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatar.showLoading(false);
      });
  },
});

const popupCheck = new PopupWithDelete({
  selector: ".popup-check",
  submit: () => {
    const { data, deleteCard } = popupCheck.getData();
    api
      .deleteCard(data._id)
      .then((res) => {
        deleteCard();
        popupCheck.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

function handleDeleteCard(data, deleteCard) {
  popupCheck.open();
  popupCheck.setData(data, deleteCard);
}

popupOpenButtonAvatar.addEventListener("click", () => {
  popupAvatar.open();
});
popupAvatar.setEventListeners();
popupCheck.setEventListeners();
popupImage.setEventListeners();
popupFormCard.setEventListeners();
popupFormEdit.setEventListeners();
