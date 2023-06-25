import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor({ selector, submit }) {
    super({ selector });
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submit = submit;
  }
  _getInputValues() {
    let data = {};
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

  close() {
    this._form.reset();
    super.close();
  }
}
