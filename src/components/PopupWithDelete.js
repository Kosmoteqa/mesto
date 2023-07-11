import { Popup } from "./Popup.js";
export class PopupWithDelete extends Popup {
  constructor({ selector, submit }) {
    super({ selector });
    this._form = this._popup.querySelector(".popup-check__form");
    this._submit = submit;
  }
  getData() {
    return {data:this._data, deleteCard:this._deleteCard};
  }
  setData(data, deleteCard) {
    this._data = data
    this._deleteCard = deleteCard
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit();
    });
    super.setEventListeners();
  }
}