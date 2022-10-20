import Task from "./Task";
import UI from "./UI";
import { compareAsc, format } from "date-fns";

class TaskList {
  static rawTaskArray = [
    {
      name: "Change light bulb - custom",
      description: "Change it in the garage",
      priority: "high",
      date: [2022, 10, 13],
      project: "Bananas",
      id: 1,
    },
    {
      name: "Create business plan - custom",
      description: "Create business plan for flamingo united",
      priority: "low",
      date: [2022, 10, 14],
      project: "traktor",
      id: 2,
    },
  ];
  static addNewTask = function (newTask) {
    const taskId = TaskList.rawTaskArray.length + 1;
    console.log(taskId);
    newTask.id = taskId;
    TaskList.rawTaskArray.push(newTask);
    console.log(TaskList.rawTaskArray);
  };
}

export default TaskList;
