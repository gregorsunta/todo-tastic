//this index file starts the whole web app
import Task from "./modules/Task";
import TaskList from "./modules/TaskList";
import UI from "./modules/UI";
import Storage from "./modules/Storage.js";

document.addEventListener("DOMContentLoaded", function () {
  UI.DisplayController.addMainEventListeners();
  UI.DisplayController.addModalEventListeners();
  const taskList = Storage.getStorage("taskList");
  taskList.forEach((task) => {
    // UI.DisplayFunctions.displayTask.displayByObj(task);
    UI.DisplayFunctions.displayTask.displayInDates(task);
    UI.DisplayFunctions.displayTask.displayInPriorities(task);
  });
  UI.DisplayFunctions.refreshProjectsInForm();
});
