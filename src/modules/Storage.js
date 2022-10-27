export default class Storage {
  static updateStorage = function (taskList) {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  };
  static getStorage = function (key) {
    console.log(localStorage.getItem(key));
    return localStorage.getItem(key);
  };
}
