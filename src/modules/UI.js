import Task from "./Task";
import TaskList from "./TaskList";

export default class UI {
  static addMainEventListeners = function () {
    const addBtn = document.querySelector("#add-btn");
    const profileBtn = document.querySelector("#profile-btn");
    const settingsBtn = document.querySelector("#settings-btn");
    addBtn.addEventListener("click", UI.openModal);
  };

  static addModalEventListeners = function () {
    const modal = document.querySelector(".modal");
    const closeModalBtn = document.querySelector(".modal-close-btn");
    // const confirmModalBtn = document.querySelector(".modal-confirm-btn");
    const priorityBtns = document.querySelectorAll(".priority-btn");

    closeModalBtn.addEventListener("click", UI.closeModal);

    priorityBtns.forEach((el) => {
      el.addEventListener("click", function (e) {
        priorityBtns.forEach((el) => el.classList.remove("checked-priority"));
        e.preventDefault();
        el.classList.add("checked-priority");
      });
    });

    modal.addEventListener("submit", function (e) {
      e.preventDefault();
      TaskList.addNewTask();
      UI.closeModal();
      UI.resetModal();
    });
  };

  static getModalInput = function () {
    const getName = function () {
      return document.getElementById("task-name").value;
    };
    const getProject = function () {
      return document.getElementById("project-name").value;
    };
    const getDate = function () {
      const input = document.getElementById("task-date").value;
      return new Date(input);
    };
    const getPriority = function () {};

    return [getName(), getProject(), getPriority(), getDate()];
  };

  static openModal = function () {
    const taskInputModal = document.querySelector(".modal");
    taskInputModal.classList.remove("hide");
  };

  static closeModal = function () {
    const taskInputModal = document.querySelector(".modal");
    taskInputModal.classList.add("hide");
  };

  static resetModal = function () {
    const taskName = document.getElementById("task-name").textContent;
    const projectName = document.getElementById("project-name").textContent;
    const taskDate = document.getElementById("task-date").textContent;
    const priorityBtns = Array.from(
      document.getElementsByClassName("priority-btn")
    );
    console.log(priorityBtns);
    priorityBtns.forEach((element) => {
      (el) => /* el.removeAttribute("clicked") */ console.log("da");
    });
  };

  static populateTasks = function () {
    const div = document.createElement("div");
    const form = document.createElement("form");
    const p = document.createElement("p");
  };
}
