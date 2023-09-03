export default class UserInfo {
  constructor ({nameSelector, jobSelector, avatarSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {name: this._nameElement.textContent, job: this._aboutElement.textContent};
  }
  _getUserDataObject(userDataObject) {
    this._name = userDataObject.name;
    this._about = userDataObject.about;
    this._avatar = userDataObject.avatar;
    this.id = userDataObject._id;
  }
  setUserInfo(userDataObject) {
    this._getUserDataObject(userDataObject);
    this._nameElement.textContent = this._name;
    this._aboutElement.textContent = this._about;
  }
  setAvatar(userDataObject) {
    this._getUserDataObject(userDataObject);
    this._avatarElement.src = this._avatar;
  }
}