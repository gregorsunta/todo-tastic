import Task from "./Task";
import UI from "./UI";

class TaskList {
  static taskArray = [];
  static addNewTask = function () {
    const input = UI.getModalInput();
    console.log(input);
    const newTask = new Task(...input);
    TaskList.taskArray.push(newTask);
    console.log("Updated array: " + TaskList.taskArray[0]);
  };
}

export default TaskList;
