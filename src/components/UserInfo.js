export default class UserInfo{
  constructor({nameSelector, careerSelector}) {
    this._name = document.querySelector(nameSelector);
    this._career = document.querySelector(careerSelector);
  }

  getUserInfo() {
    return {name: this._name.textContent, career: this._career.textContent};
  }

  setUserInfo({name, career}) {
    this._name.textContent = name;
    this._career.textContent = career;
  }
}
