export default class UserInfo{
  constructor({nameSelector, careerSelector, imageSelector}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(careerSelector);
    this._image = document.querySelector(imageSelector);
  }

  getUserInfo() {
    return {name: this._name.textContent, about: this._about.textContent};
  }

  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setUserAvatar({avatar}) {
    this._image.src = avatar;
  }

  setUserId({_id}) {
    this._id = _id;
  }

  getUserId() {
    return this._id;
  }
}
