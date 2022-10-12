import Task from "./Task";
import TaskList from "./TaskList";
import Project from "./Project";
import { format } from "date-fns";

export default class UI {
  static DisplayController = (function () {
    const addMainEventListeners = function () {
      const addBtn = document.querySelector("#add-btn");
      const profileBtn = document.querySelector("#profile-btn");
      const settingsBtn = document.querySelector("#settings-btn");
      addBtn.addEventListener("click", UI.DisplayFunctions.openModal);
    };
    const addModalEventListeners = function () {
      const content = document.querySelector("#content");
      const modal = document.querySelector(".modal");
      const closeModalBtn = document.querySelector(".modal-close-btn");
      const priorityBtns = document.querySelectorAll(".priority-btn");
      const taskForm = document.querySelector("#modal-task-form");

      closeModalBtn.addEventListener("click", UI.DisplayFunctions.closeModal);
      priorityBtns.forEach((el) => {
        el.addEventListener("click", function (e) {
          e.preventDefault();
          UI.DisplayFunctions.clearPriority();
          UI.DisplayFunctions.checkPriority(e.target);
        });
      });

      taskForm.addEventListener("submit", function (e) {
        e.preventDefault();
        TaskList.addNewTask(
          new Task(...UI.DisplayFunctions.getModalInput().getAll())
        );
        console.log(`I got this task: ${TaskList.rawTaskArray[-1]}`);

        Project.addNewProject();
        taskForm.reset();
        UI.DisplayFunctions.removeChildrenFrom(content);
        UI.DisplayFunctions.refreshProjectsInForm();
        UI.DisplayFunctions.closeModal();
        UI.DisplayFunctions.content.append(
          ...UI.DisplayFunctions.displayTasks.mainInfo(TaskList.rawTaskArray)
        );
        console.log(
          ...UI.DisplayFunctions.displayTasks.mainInfo(TaskList.rawTaskArray)
        );
      });
    };
    return { addMainEventListeners, addModalEventListeners };
  })();

  static DisplayFunctions = (function () {
    const checkPriority = function (el) {
      el.classList.add("checked-priority");
    };

    const clearPriority = function () {
      const checkedPriority =
        document.getElementsByClassName("checked-priority");

      Array.from(checkedPriority).forEach((el) =>
        el.classList.remove("checked-priority")
      );
    };

    const openModal = function () {
      const taskInputModal = document.querySelector(".modal");
      taskInputModal.classList.remove("hide");
    };

    const closeModal = function () {
      const taskInputModal = document.querySelector(".modal");
      taskInputModal.classList.add("hide");
    };

    const displayTasks = (function () {
      const mainInfo = function (tasksArray) {
        const elementArr = [];
        tasksArray.forEach((task) => {
          console.log(task.priority);

          const taskContainer = document.createElement("div");
          const leftSide = document.createElement("div");
          const taskName = document.createElement("p");
          const taskDescription = document.createElement("p");
          const taskDate = document.createElement("p");
          const taskPriority = document.createElement("div");
          taskPriority.classList.add("task-priority");
          taskName.textContent = task.title;
          taskDescription.textContent = task.description;
          taskDate.textContent = task.dueDate;
          leftSide.classList.add("left-side");
          leftSide.append(taskPriority, taskName);
          taskContainer.appendChild(leftSide);
          taskContainer.appendChild(taskDate);
          taskContainer.classList.add("main-info");
          taskContainer.classList.add("task-container");
          elementArr.push(taskContainer);
        });
        return elementArr;
      };

      const allInfo = function (tasksArray) {
        tasksArray.forEach((task) => {
          const taskContainer = document.createElement("div");
          const taskName = document.createElement("p");
          const taskDescription = document.createElement("p");
          const taskDate = document.createElement("p");
          const taskPriority = document.createElement("div");
          taskPriority.classList.add("task-priority");
          taskName.textContent = task.title;
          taskDescription.textContent = task.description;
          taskDate.textContent = task.dueDate;
          taskContainer.appendChild(taskPriority);
          taskContainer.appendChild(taskName);
          taskContainer.appendChild(taskDescription);
          taskContainer.appendChild(taskDate);
          taskContainer.classList.add("all-info");
          taskContainer.classList.add("task-container");
          return taskContainer;
        });
      };

      return { mainInfo, allInfo };
    })();

    const displayTasksInGroups = (function () {
      const lowPriorityContainer = document.querySelector(
        ".task-group .low-priority"
      );
      const mediumPriorityContainer = document.querySelector(
        ".task-group .medium-priority"
      );
      const highPriorityContainer = document.querySelector(
        ".task-group .high-priority"
      );
      const criticalPriorityContainer = document.querySelector(
        ".task-group .critical-priority"
      );
      TaskList.rawTaskArray.forEach((task) => {
        const taskName = document.createElement("div");
        taskName.textContent = task.title;
        if (task.priority === "low-priority") {
          lowPriorityContainer.appendChild(taskName);
        }
      });
    })();

    const refreshProjectsInForm = function () {
      const taskProject = document.getElementById("task-project");
      removeChildrenFrom(taskProject);
      Project.projectList.forEach((el) => {
        const option = document.createElement("option");
        option.textContent = el;
        taskProject.append(option);
      });
    };

    const removeChildrenFrom = function (parent) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    };

    const getModalInput = function () {
      const getName = function () {
        return document.getElementById("task-name").value;
      };
      const getDescription = function () {
        return document.getElementById("task-description").value;
      };
      const getDate = function () {
        const input = document.getElementById("task-date").value;
        const formattedInput = input.replaceAll("-", ",");
        const date = format(new Date(formattedInput), "d. LLLL(uu)");
        return date;
      };
      const getPriority = function () {
        const checkedEl = document.querySelector(".checked-priority");
        return checkedEl.id;
      };
      const getProject = function () {
        return document.getElementById("task-description").value;
      };
      const getAll = function () {
        return [
          getName(),
          getDescription(),
          getPriority(),
          getDate(),
          getProject(),
        ];
      };
      return {
        getAll,
        getName,
        getDescription,
        getPriority,
        getDate,
        getProject,
      };
    };
    return {
      displayTasksInGroups,
      checkPriority,
      clearPriority,
      openModal,
      closeModal,
      displayTasks,
      refreshProjectsInForm,
      removeChildrenFrom,
      getModalInput,
    };
  })();
}
