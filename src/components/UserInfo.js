export default class UserInfo {
  constructor ({nameSelector, jobSelector}) {
    this._headingElement = document.querySelector(nameSelector);
    this._subheadingElement = document.querySelector(jobSelector);
  }
  getUserInfo() {
    return {name: this._headingElement.textContent, job: this._subheadingElement.textContent};
  }
  setUserInfo({name, job}) {
    this._headingElement.textContent = name;
    this._subheadingElement.textContent = job;
  }
}