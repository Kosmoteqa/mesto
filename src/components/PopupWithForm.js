import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor({ selector, submit }) {
    super({ selector });
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._btn = this._form.querySelector(".popup__button");
    this._btnText = this._btn.textContent;
    this._submit = submit;
  }
  _getInputValues() {
    const data = {};
    this._inputList.forEach((element) => {
      data[element.name] = element.value;
    });

    return data;
  }
  setInputValues(data) {
    this._inputList.forEach((element) => {
      element.value = data[element.name];
    });
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
    });
    super.setEventListeners();
  }

  showLoading(state) {
    if (state) {
      this._btn.textContent = "Сохранение...";
    } else {
      this._btn.textContent = this._btnText;
    }
  }

  close() {
    this._form.reset();
    super.close();
  }
}
