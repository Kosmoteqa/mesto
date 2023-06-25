import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector(".popup-image__photo");
    this._title = this._popup.querySelector(".popup-image__info");
  }

  open(name, src) {
    this._image.src = src;
    this._title.textContent = name;
    this._image.alt = name;
    super.open();
  }
}
