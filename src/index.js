//this index file starts the whole web app
import Task from "./modules/Task";
import TaskList from "./modules/TaskList";
import UI from "./modules/UI";

const content = document.querySelector("#content");
UI.DisplayController.addMainEventListeners();
UI.DisplayController.addModalEventListeners();
content.append(
  ...UI.DisplayFunctions.displayTasks.mainInfo(TaskList.rawTaskArray)
);
