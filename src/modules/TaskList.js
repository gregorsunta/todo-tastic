import Storage from "./Storage.js";

export default class TaskList {
  static rawTaskArray = [];
  static addNewTask = function (newTask) {
    const newId = TaskList.rawTaskArray.length + 1;
    newTask.id = newId;
    TaskList.rawTaskArray.push(newTask);
    Storage.updateStorage(TaskList.rawTaskArray);
  };
  static editTask = function (oldTaskObj, updatedTaskObj) {
    oldTaskObj.name = updatedTaskObj.name;
    oldTaskObj.description = updatedTaskObj.description;
    oldTaskObj.priority = updatedTaskObj.priority;
    oldTaskObj.project = updatedTaskObj.project;
  };
}
