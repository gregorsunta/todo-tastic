import Task from "./Task";
import TaskList from "./TaskList";
import Project from "./Project";

export default class UI {
  static addMainEventListeners = function () {
    const addBtn = document.querySelector("#add-btn");
    const profileBtn = document.querySelector("#profile-btn");
    const settingsBtn = document.querySelector("#settings-btn");
    addBtn.addEventListener("click", UI.openModal);
  };

  static addModalEventListeners = function () {
    const content = document.querySelector("#content");
    const modal = document.querySelector(".modal");
    const closeModalBtn = document.querySelector(".modal-close-btn");
    // const confirmModalBtn = document.querySelector(".modal-confirm-btn");
    const priorityBtns = document.querySelectorAll(".priority-btn");
    const taskForm = document.querySelector("#modal-task-form");

    closeModalBtn.addEventListener("click", UI.closeModal);

    priorityBtns.forEach((el) => {
      el.addEventListener("click", function (e) {
        priorityBtns.forEach((el) => el.classList.remove("checked-priority"));
        e.preventDefault();
        el.classList.add("checked-priority");
      });
    });

    taskForm.addEventListener("submit", function (e) {
      e.preventDefault();
      TaskList.addNewTask(UI.getModalInput()[5]);
      Project.addNewProject();
      taskForm.reset();
      UI.removeChildrenFrom(content);
      UI.refreshProjectsInForm();
      UI.closeModal();
      UI.displayTasks();
    });
  };

  static getModalInput = function () {
    const getName = function () {
      return document.getElementById("task-name").value;
    };
    const getDescription = function () {
      return document.getElementById("task-description").value;
    };
    const getDate = function () {
      const input = document.getElementById("task-date").value;
      return new Date(input);
    };
    const getPriority = function () {};
    const getProject = function () {
      return document.getElementById("task-description").value;
    };

    return { getName, getDescription, getPriority, getDate, getProject };
  };

  static openModal = function () {
    const taskInputModal = document.querySelector(".modal");
    taskInputModal.classList.remove("hide");
  };

  static closeModal = function () {
    const taskInputModal = document.querySelector(".modal");
    taskInputModal.classList.add("hide");
  };

  static displayTasks = function () {
    const contentContainer = document.querySelector("#content");
    TaskList.taskArray.forEach((el) => {
      const div = document.createElement("div");
      const taskName = document.createElement("p");
      const taskDescription = document.createElement("p");
      const taskDate = document.createElement("p");
      const taskPriority = document.createElement("p");

      div.classList.add("task-container");
      taskName.classList.add("task-data");
      taskDescription.classList.add("task-data");
      taskDate.classList.add("task-data");
      taskPriority.classList.add("task-data");
      taskName.textContent = el.title;
      taskDescription.textContent = el.description;
      taskDate.textContent = el.dueDate;
      taskPriority;

      div.appendChild(taskName);
      div.appendChild(taskDescription);
      div.appendChild(taskPriority);
      div.appendChild(taskDate);
      contentContainer.appendChild(div);
    });
  };

  static refreshProjectsInForm = function () {
    const taskProject = document.getElementById("task-project");
    UI.removeChildrenFrom(taskProject);
    Project.projectList.forEach((el) => {
      const option = document.createElement("option");
      option.textContent = el;
      taskProject.append(option);
    });
  };

  static removeChildrenFrom = function (parent) {
    while (parent.firstChild) {
      console.log("removing..");
      parent.removeChild(parent.firstChild);
    }
  };
}
