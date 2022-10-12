import Task from "./Task";
import UI from "./UI";
import { compareAsc, format } from "date-fns";

class TaskList {
  static rawTaskArray = [
    {
      title: "Change light bulb - custom",
      description: "Change it in the garage",
      priority: "none -c",
      dueDate: "9. August(2022)",
      project: "take a look",
    },
    {
      title: "Create business plan - custom",
      description: "Create business plan for flamingo united",
      priority: "none -c",
      dueDate: "9. August(2022)",
      project: "take a look",
    },
  ];
  static addNewTask = function (newTask) {
    TaskList.rawTaskArray.push(newTask);
  };
  static formattedTaskArray = this.rawTaskArray.map((obj) => {
    obj.dueDate;
  });
}

export default TaskList;
