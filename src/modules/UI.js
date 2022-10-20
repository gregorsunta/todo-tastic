import Task from "./Task";
import TaskList from "./TaskList";
import Project from "./Project";
import { format, yearsToMonths } from "date-fns";

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
        const taskInput = UI.DisplayFunctions.getModalInput();
        const curTask = new Task(...taskInput);
        TaskList.addNewTask(curTask);

        Project.addNewProject();
        taskForm.reset();
        // UI.DisplayFunctions.removeChildrenFrom(content);
        // UI.DisplayFunctions.refreshProjectsInForm();
        UI.DisplayFunctions.closeModal();
        UI.DisplayFunctions.refreshProjectsInForm();
        UI.DisplayFunctions.displayTask.displayInPriorities(curTask);
        UI.DisplayFunctions.displayTask.displayInDates(curTask);
        UI.DisplayFunctions.displayTask.displayByObj(curTask);
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
    const displayTask = (function () {
      const displayById = function (taskId) {
        const _taskId = taskId;
        TaskList.rawTaskArray.forEach((task) => {
          if (task.id == taskId) {
            console.log(task);
            displayTask.createMain(task);
          }
        });
      };
      const displayByObj = function (taskObj) {
        content.appendChild(createMain(taskObj));
      };
      const createMain = function (taskObj) {
        const content = document.querySelector("#content");
        const taskContainer = document.createElement("div");
        const leftSide = document.createElement("div");
        const rightSide = document.createElement("div");
        const taskName = document.createElement("p");
        const taskDescription = document.createElement("p");
        const taskDate = document.createElement("p");
        const taskPriorityImg = document.createElement("img");
        const taskDelete = document.createElement("div");
        taskContainer.classList.add("main-info");
        taskContainer.classList.add("task-container");
        leftSide.classList.add("left-side");
        rightSide.classList.add("right-side");

        taskDelete.addEventListener("click", function (e) {
          e.preventDefault();
          removeTask(e.currentTarget.parentNode.parentNode);
        });
        taskPriorityImg.classList.add("task-priority");
        taskPriorityImg.classList.add(taskObj.priority);
        taskPriorityImg.src = "./images/right-arrow.svg";
        taskDelete.classList.add("task-delete");

        taskName.textContent = taskObj.name;
        taskDescription.textContent = taskObj.description;
        taskDate.textContent = taskObj.date;

        leftSide.append(taskPriorityImg, taskName);
        rightSide.append(taskDate, taskDelete);

        taskContainer.appendChild(leftSide);
        taskContainer.appendChild(rightSide);
        taskContainer.dataset.taskId = taskObj.id;
        return taskContainer;
      };
      const displayInPriorities = function (taskObj) {
        // const lowPriorityContainer = document.querySelector(".task-group.low");
        // const mediumPriorityContainer =
        //   document.querySelector(".task-group.medium");
        const highPriorityContainer =
          document.querySelector(".task-group.high");
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task-container");
        const taskName = document.createElement("div");
        taskName.classList.add("task-name");
        taskContainer.appendChild(taskName);
        taskContainer.dataset.taskId = taskObj.id;
        taskName.textContent = taskObj.name;
        taskContainer.addEventListener("click", function (e) {
          e.preventDefault();
          console.log(e.target);
        });
        if (taskObj.priority === "high") {
          highPriorityContainer.appendChild(taskContainer);
        }
        //else if (taskObj.priority === "medium") {
        //   mediumPriorityContainer.appendChild(taskContainer);
        // } else if (taskObj.priority === "low") {
        //   lowPriorityContainer.appendChild(taskContainer);
        // }
      };
      const displayInDates = function (taskObj) {
        const today = document.querySelector(".task-group.today");
        const tomorrow = document.querySelector(".task-group.tomorrow");
        const week = document.querySelector(".task-group.week");
        const month = document.querySelector(".task-group.month");
        const curDate = format(new Date(), "yyyy, MM, d")
          .split(",")
          .map((str) => Number(str));
        const newTask = () => {
          const taskContainer = document.createElement("div");
          taskContainer.classList.add("task-container");
          const taskName = document.createElement("div");
          taskName.classList.add("task-name");
          taskName.textContent = taskObj.name;
          taskContainer.appendChild(taskName);
          taskContainer.dataset.taskId = taskObj.id;
          const newTaskContainer = taskContainer;
          return newTaskContainer;
        };

        if (taskObj.date) {
          if (
            curDate[0] === taskObj.date[0] &&
            curDate[1] === taskObj.date[1] &&
            curDate[2] === taskObj.date[2]
          ) {
            today.appendChild(newTask());
          }
          if (
            curDate[0] === taskObj.date[0] &&
            curDate[1] === taskObj.date[1] &&
            curDate[2] + 1 === taskObj.date[2]
          ) {
            tomorrow.appendChild(newTask());
          }
          if (
            curDate[0] === taskObj.date[0] &&
            curDate[1] === taskObj.date[1]
          ) {
            month.appendChild(newTask());
          }
        }
      };
      return {
        displayById,
        displayByObj,
        createMain,
        displayInPriorities,
        displayInDates,
      };
    })();
    const refreshProjectsInForm = function () {
      const taskProjects = document.getElementById("task-project");
      removeChildrenFrom(taskProjects);
      TaskList.rawTaskArray.forEach((el) => {
        const option = document.createElement("option");
        option.textContent = el.project;
        taskProjects.append(option);
      });
    };
    const removeChildrenFrom = function (parentNode) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    };
    const removeTask = function (node) {
      const taskId = node.getAttribute("data-task-id");
      const allTaskElements = document.querySelectorAll(
        `[data-task-id='${taskId}']`
      );
      allTaskElements.forEach((el) => el.remove());
    };
    const getModalInput = function () {
      const getName = function () {
        return document.getElementById("task-name").value;
      };
      const getDescription = function () {
        return document.getElementById("task-description").value;
      };
      const getDate = function () {
        const date = document.getElementById("task-date").value;
        const dateArr = date.split("-");
        const numberDateArr = dateArr.map((string) => Number(string));
        // const formattedInput = input.replaceAll("-", ",");
        // const date = format(new Date(formattedInput), "d. LLLL(uu)");
        return numberDateArr;
      };
      const getPriority = function () {
        const checkedEl = document.querySelector(".checked-priority");
        const classArr = Array.from(checkedEl.classList);

        return classArr[1];
      };
      const getProject = function () {
        return document.getElementById("task-description").value;
      };
      const name = getName();
      const description = getDescription();
      const priority = getPriority();
      const date = getDate();
      const project = getProject();
      return [name, description, priority, date, project];
    };
    return {
      // displayTasksInGroups,
      checkPriority,
      clearPriority,
      openModal,
      closeModal,
      displayTask,
      refreshProjectsInForm,
      removeChildrenFrom,
      getModalInput,
    };
  })();
}
