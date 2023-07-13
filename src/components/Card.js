import { data } from "autoprefixer";

export class Card {
  constructor(
    dataCard,
    templateCard,
    openImagePopup,
    handleDelete,
    getId,
    likeCardApi,
    dislikeCardApi
  ) {
    this._dataCard = dataCard;
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._templateCard = templateCard;
    this._cardElement = null;
    this._handleCardClick = openImagePopup;
    this._handleDeleteCard = handleDelete;
    this._getId = getId;
    this._likeCardApi = likeCardApi;
    this._dislikeCardApi = dislikeCardApi;
    this._isLiked =
      dataCard.likes.length != 0
        ? dataCard.likes.find((item) => item._id == this._getId())
        : false;
  }

  setInfoImgElement(infoImgElement) {
    this._infoImg = infoImgElement;
  }

  _handleLike() {
    this._likeButton.classList.add("card__like-image_active");
  }

  _handleDislike() {
    this._likeButton.classList.remove("card__like-image_active");
  }

  changeLike(data) {
    const res = data.likes.some((elem) => {
      return elem._id == this._getId();
    });
    if (res) {
      this._handleLike();
    } else {
      this._handleDislike();
    }
  }

  _handleDelete() {
    this._cardElement.remove();
    this._cardElement = null;
    console.log();
  }

  _changeLikeApi(data) {
    if (this._likeButton.classList.contains("card__like-image_active")) {
      this._dislikeCardApi(data._id);
    } else {
      this._likeCardApi(data._id);
    }
  }

  _setEventListeners() {
    this._image.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard(this._dataCard, this._handleDelete.bind(this))
    );
    this._likeButton.addEventListener("click", () =>
      this._changeLikeApi(this._dataCard)
    );
  }

  _getElements() {
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likesCount = this._cardElement.querySelector(".card__counter");
    this._isLiked
      ? this._likeButton.classList.add("card__like-image_active")
      : null;
  }

  setLikesCount(data) {
    this._likesCount.textContent = data.likes.length;
  }

  _isOwner(data) {
    if (data.owner._id != this._getId()) {
      this._deleteButton.remove();
    }
  }

  create() {
    this._cardElement = this._templateCard.cloneNode(true);
    this._title = this._cardElement.querySelector(".card__title");
    this._image = this._cardElement.querySelector(".card__image");

    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    this._getElements();
    this._isOwner(this._dataCard);
    this.setLikesCount(this._dataCard);
    this._setEventListeners();

    return this._cardElement;
  }
}
