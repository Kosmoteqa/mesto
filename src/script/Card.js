import { Popup } from "./Popup.js";
export class Card {
  constructor(dataCard, templateCard, openImagePopup) {
    this._dataCard = dataCard;
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._templateCard = templateCard;
    this._cardElement = null;
    this._handleCardClick = openImagePopup;
  }

  setInfoImgElement(infoImgElement) {
    this._infoImg = infoImgElement;
  }

  _handleLike() {
    this._likeButton.classList.toggle("card__like-image_active");
  }

  _handleDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._image.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
    this._deleteButton.addEventListener("click", this._handleDelete.bind(this));
    this._likeButton.addEventListener("click", this._handleLike.bind(this));
  }

  create() {
    this._cardElement = this._templateCard.cloneNode(true);
    this._title = this._cardElement.querySelector(".card__title");
    this._image = this._cardElement.querySelector(".card__image");

    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
