import Storage from "./Storage.js";

export default class TaskList {
  static taskArray = Storage.getStorage("taskList");
  static addNewTask = function (newTask) {
    const newId = TaskList.taskArray.length + 1;
    newTask.id = newId;
    TaskList.taskArray.push(newTask);
    Storage.updateStorage(TaskList.taskArray);
  };
  static editTask = function (oldTaskObj, updatedTaskObj) {
    const oldTask = TaskList.taskArray.find(({ id }) => {
      return id === oldTaskObj.id;
    });
    oldTask.name = updatedTaskObj.name;
    oldTask.description = updatedTaskObj.description;
    oldTask.priority = updatedTaskObj.priority;
    oldTask.project = updatedTaskObj.project;
    Storage.updateStorage(TaskList.taskArray);
  };
  static getTaskArray = function () {
    const taskArray = TaskList.taskArray;
    return taskArray;
  };
  static removeTask = function (taskToDelete) {
    const taskIndex = TaskList.taskArray.findIndex(
      ({ id }) => id === taskToDelete.id
    );
    TaskList.taskArray.splice(taskIndex, 1);
    Storage.updateStorage(TaskList.taskArray);
  };
}
