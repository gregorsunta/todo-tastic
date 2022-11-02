export default class Storage {
  static updateStorage = function (taskList) {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  };
  static getStorage = function (key) {
    console.log(JSON.parse(localStorage.getItem(key)));
    return JSON.parse(localStorage.getItem(key));
  };
}
