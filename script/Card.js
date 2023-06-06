
export class Card {
  constructor(dataCard, templateCard, openImagePopup) {
    this._dataCard = dataCard;
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._templateCard = templateCard;
    this._cardElement = null;
    this._handleCardClick = this._handleCardClick.bind(this);
    this._onCardClick = openImagePopup;
  }

  _handleCardClick() {
    infoImg.textContent = this._name;
    photoImg.src = this._link;
    photoImg.alt = this._name;
    this._onCardClick(this._dataCard);
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
    const image = this._cardElement.querySelector(".card__image");
    const deleteButton = this._cardElement.querySelector(".card__delete-button");
    this._likeButton = this._cardElement.querySelector(".card__like-button");

    image.addEventListener("click", this._handleCardClick.bind(this));
    deleteButton.addEventListener("click", this._handleDelete.bind(this));
    this._likeButton.addEventListener("click", this._handleLike.bind(this));
  }

  create() {
    this._cardElement = this._templateCard.cloneNode(true);
    const title = this._cardElement.querySelector(".card__title");
    const image = this._cardElement.querySelector(".card__image");

    title.textContent = this._name;
    image.src = this._link;
    image.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}