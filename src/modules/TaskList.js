import Task from "./Task";
import UI from "./UI";

class TaskList {
  static taskArray = [];
  static addNewTask = function (task) {
    const input = task;
    console.log(input);
    const newTask = new Task(...input);
    TaskList.taskArray.push(newTask);
    console.log("Updated array: " + TaskList.taskArray[0]);
  };
}

export default TaskList;
