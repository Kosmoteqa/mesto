export class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._info.textContent,
    };
  }

  getUserId() {
    return this._userId;
  }

  setUserInfo(data) {
    (this._name.textContent = data.name), (this._info.textContent = data.about);
    this._userId = data._id;
  }

  setAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}
