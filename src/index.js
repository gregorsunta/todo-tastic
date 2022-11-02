//this index file starts the whole web app
import Task from "./modules/Task";
import TaskList from "./modules/TaskList";
import UI from "./modules/UI";
import Storage from "./modules/Storage.js";

const content = document.querySelector("#content");
document.addEventListener("DOMContentLoaded", function () {
  UI.DisplayController.addMainEventListeners();
  UI.DisplayController.addModalEventListeners();
  const taskList = Storage.getStorage("taskList");
  console.log(typeof taskList);
  taskList.forEach((task) => {
    UI.DisplayFunctions.displayTask.displayByObj(task);
    UI.DisplayFunctions.displayTask.displayInDates(task);
    UI.DisplayFunctions.displayTask.displayInPriorities(task);
  });
  UI.DisplayFunctions.refreshProjectsInForm();
});
// document.addEventListener();

// content.append(
//   TaskList.rawTaskArray.forEach((task) =>
//     UI.DisplayFunctions.displayTask.mainInfo(task)
//   )
// );
// UI.DisplayFunctions.displayTasksInGroups.displayInPriorities();
// UI.DisplayFunctions.displayTasksInGroups.displayInDates();
