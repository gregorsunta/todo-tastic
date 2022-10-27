import Task from "./Task";
import Storage from "./Storage";
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
        const taskInput = UI.DisplayFunctions.getModalInput(
          e.target.parentNode
        );
        const curTask = new Task(...taskInput);
        TaskList.addNewTask(curTask);

        Project.addNewProject();
        taskForm.reset();
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
    // const displayTasksByProperty = function (property, value) {
    //   const filteredTasks = TaskList.filter((task) => task[property] === value);
    //   filteredTasks.forEach((task) => displayTask.createTaskContainer(task));
    // };
    const displayTask = (function () {
      const displayById = function (taskId) {
        const _taskId = Number(taskId);
        TaskList.rawTaskArray.forEach((task) => {
          if (task.id == _taskId) {
            content.appendChild(createTaskContainer(task));
          }
        });
      };
      const displayByObj = function (taskObj) {
        content.appendChild(createTaskContainer(taskObj));
      };
      const createTaskContainer = function (taskObj) {
        const task = createTask(taskObj);
        const container = document.createElement("div");
        container.classList.add("container");
        container.dataset.taskId = taskObj.id;
        container.append(task);
        return container;
      };
      const createTask = function (taskObj) {
        const taskContainer = document.createElement("div");
        const taskNameContainer = document.createElement("div");
        const taskDateContainer = document.createElement("div");
        const taskPriorityContainer = document.createElement("div");
        const taskDescriptionContainer = document.createElement("div");
        const taskName = document.createElement("p");
        const taskNameLabel = document.createElement("p");
        const taskDescription = document.createElement("p");
        const taskDescriptionLabel = document.createElement("p");
        const taskDate = document.createElement("p");
        const taskDateLabel = document.createElement("p");
        const taskPriority = document.createElement("p");
        const taskPriorityLabel = document.createElement("p");
        const taskPriorityIcon = document.createElement("div");
        const taskDeleteIcon = document.createElement("div");
        const taskEditIcon = document.createElement("div");
        const details = document.createElement("div");
        const main = document.createElement("div");

        taskContainer.classList.add("main-info");
        taskContainer.classList.add("task-container");
        taskNameContainer.classList.add("detail-container");
        taskDateContainer.classList.add("detail-container");
        taskPriorityContainer.classList.add("detail-container");
        taskDescriptionContainer.classList.add("detail-container");
        details.classList.add("details");
        main.classList.add("main");

        taskPriorityIcon.addEventListener("click", function (e) {
          e.preventDefault();
          const detailsNode = e.target.parentNode.querySelector(".details");
          toggleHide(detailsNode);
        });
        taskDeleteIcon.addEventListener("click", function (e) {
          e.preventDefault();
          removeTaskById(e.currentTarget.parentNode);
        });
        taskEditIcon.addEventListener("click", function (e) {
          e.preventDefault();
          e.target.parentNode.parentNode.append(
            createEditForm(e.currentTarget.parentNode.parentNode)
          );
        });

        taskPriorityIcon.classList.add("task-priority");
        taskPriorityIcon.classList.add(taskObj?.priority);
        taskPriorityIcon.classList.add("icon");
        taskEditIcon.classList.add("task-edit");
        taskEditIcon.classList.add("icon");
        taskDeleteIcon.classList.add("task-delete");
        taskDeleteIcon.classList.add("icon");
        details.classList.add("hide");
        taskName.textContent = taskObj.name;
        taskNameLabel.textContent = "Task name: ";
        taskNameLabel.classList.add("label");
        taskDescription.textContent = taskObj.description;
        taskDescriptionLabel.textContent = "Task description: ";
        taskDescriptionLabel.classList.add("label");
        taskDate.textContent = taskObj.date;
        taskDateLabel.textContent = "Task date: ";
        taskDateLabel.classList.add("label");
        taskPriority.textContent = taskObj.priority;
        taskPriorityLabel.textContent = "Task priority: ";
        taskPriorityLabel.classList.add("label");
        taskNameContainer.append(taskNameLabel, taskName);
        taskDescriptionContainer.append(taskDescriptionLabel, taskDescription);
        taskDateContainer.append(taskDateLabel, taskDate);
        taskPriorityContainer.append(taskPriorityLabel, taskPriority);
        main.append(taskName, taskDate);
        details.append(taskDescriptionContainer, taskPriorityContainer);
        taskContainer.append(
          taskPriorityIcon,
          main,
          taskDeleteIcon,
          taskEditIcon,
          details
        );
        taskContainer.dataset.taskId = taskObj.id;
        return taskContainer;
      };
      const displayInPriorities = function (taskObj) {
        const content = document.querySelector("#content");
        const highPriorityContainer = document.querySelector(
          ".task-group.high > .tasks-container"
        );
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task-container");
        const taskName = document.createElement("div");
        taskName.classList.add("task-name");
        taskContainer.appendChild(taskName);
        taskContainer.dataset.taskId = taskObj.id;
        taskName.dataset.taskId = taskObj.id;
        taskName.textContent = taskObj.name;
        taskName.addEventListener("click", function (e) {
          e.preventDefault();
          removeChildrenFrom(content);
          displayById(e.target.dataset.taskId);
        });
        if (taskObj.priority === "high") {
          highPriorityContainer.appendChild(taskContainer);
        }
      };
      const displayInDates = function (taskObj) {
        const content = document.querySelector("#content");

        const today = document.querySelector(
          ".task-group.today >.tasks-container"
        );
        const tomorrow = document.querySelector(
          ".task-group.tomorrow >.tasks-container"
        );
        const week = document.querySelector(
          ".task-group.week >.tasks-container"
        );
        const month = document.querySelector(
          ".task-group.month >.tasks-container"
        );
        const curDate = format(new Date(), "yyyy, MM, d")
          .split(",")
          .map((str) => Number(str));
        const newTask = () => {
          const taskContainer = document.createElement("div");
          const taskName = document.createElement("div");
          taskContainer.classList.add("task-container");
          taskName.classList.add("task-name");
          taskName.textContent = taskObj.name;
          taskContainer.appendChild(taskName);
          taskContainer.dataset.taskId = taskObj.id;
          taskName.dataset.taskId = taskObj.id;
          const newTaskContainer = taskContainer;
          taskName.addEventListener("click", function (e) {
            e.preventDefault();
            removeChildrenFrom(content);
            displayById(e.target.dataset.taskId);
          });
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
        createTask,
        createTaskContainer,
        displayInPriorities,
        displayInDates,
      };
    })();
    const createEditForm = function (task) {
      const taskId = Number(task.dataset.taskId);
      const taskObjArr = TaskList.rawTaskArray.filter((task) => {
        if (task.id === taskId) {
          return task;
        }
      });
      const taskObj = taskObjArr[0];
      task.removeChild(task.firstChild);

      const form = document.createElement("form");
      const formContainer = document.createElement("div");
      const taskNameContainer = document.createElement("div");
      const taskDateContainer = document.createElement("div");
      const taskPriorityContainer = document.createElement("div");
      const taskDescriptionContainer = document.createElement("div");
      const taskNameInput = document.createElement("input");
      const taskNameLabel = document.createElement("p");
      const taskDescriptionInput = document.createElement("input");
      const taskDescriptionLabel = document.createElement("p");
      const taskDateInput = document.createElement("input");
      const taskDateLabel = document.createElement("p");
      const taskPriorityInput = document.createElement("input");
      const taskPriorityLabel = document.createElement("p");
      const confirmTaskBtn = document.createElement("button");
      const lowPriorityBtn = document.createElement("button");
      const mediumPriorityBtn = document.createElement("button");
      const highPriorityBtn = document.createElement("button");

      taskDateContainer.classList.add("detail-container");
      taskDescriptionContainer.classList.add("detail-container");
      taskNameContainer.classList.add("detail-container");
      taskPriorityContainer.classList.add("detail-container");

      taskNameInput.value = taskObj.name;
      taskNameInput.classList.add("task-name");
      taskNameInput.setAttribute("type", "text");
      taskNameLabel.textContent = "Task name: ";
      taskNameLabel.classList.add("label");

      taskDescriptionInput.classList.add("task-description");
      taskDescriptionInput.setAttribute("type", "text");
      taskDescriptionInput.value = taskObj.description;
      taskDescriptionLabel.textContent = "Task description: ";
      taskDescriptionLabel.classList.add("label");

      taskDateInput.classList.add("task-date");
      taskDateInput.setAttribute("type", "date");
      taskDateInput.value = taskObj.date.join("-");
      taskDateLabel.textContent = "Task date: ";
      taskDateLabel.classList.add("label");

      taskPriorityLabel.textContent = "Priority: ";
      taskPriorityLabel.classList.add("label");
      lowPriorityBtn.classList.add("priority-btn");
      lowPriorityBtn.classList.add("low");
      mediumPriorityBtn.classList.add("priority-btn");
      mediumPriorityBtn.classList.add("medium");
      highPriorityBtn.classList.add("priority-btn");
      highPriorityBtn.classList.add("high");

      const priorityBtns = [lowPriorityBtn, mediumPriorityBtn, highPriorityBtn];
      priorityBtns.forEach((el) => {
        el.addEventListener("click", function (e) {
          e.preventDefault();
          UI.DisplayFunctions.clearPriority();
          UI.DisplayFunctions.checkPriority(e.target);
        });
      });

      confirmTaskBtn.textContent = "Confirm";
      confirmTaskBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const container = e.target.parentNode.parentNode;
        const taskId = Number(e.target.parentNode.parentNode.dataset.taskId);
        const taskInputArr = UI.DisplayFunctions.getModalInput(
          e.target.parentNode
        );
        const updatedTask = new Task(...taskInputArr);

        const taskArr = TaskList.rawTaskArray.filter((task) => {
          if (taskId === task.id) {
            return task;
          }
        });
        const taskObj = taskArr[0];
        removeTaskById(taskObj.id);
        TaskList.editTask(taskObj, updatedTask);

        e.target.parentNode.remove();

        Project.addNewProject();
        UI.DisplayFunctions.closeModal();
        UI.DisplayFunctions.refreshProjectsInForm();
        UI.DisplayFunctions.displayTask.displayInPriorities(taskObj);
        UI.DisplayFunctions.displayTask.displayInDates(taskObj);
        container.append(UI.DisplayFunctions.displayTask.createTask(taskObj));
      });

      taskNameContainer.append(taskNameLabel, taskNameInput);
      taskDateContainer.append(taskDateLabel, taskDateInput);
      taskPriorityContainer.append(
        taskPriorityLabel,
        lowPriorityBtn,
        mediumPriorityBtn,
        highPriorityBtn
      );
      taskDescriptionContainer.append(
        taskDescriptionLabel,
        taskDescriptionInput
      );
      form.classList.add("edit-task-container");
      form.append(
        taskNameContainer,
        taskDateContainer,
        taskPriorityContainer,
        taskDescriptionContainer,
        confirmTaskBtn
      );
      return form;
    };
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
      while (parentNode.lastChild) {
        parentNode.removeChild(parentNode.lastChild);
      }
    };
    const toggleHide = function (node) {
      if (node.classList.contains("hide")) {
        node.classList.remove("hide");
      } else {
        node.classList.add("hide");
      }
    };
    const removeTaskById = function (taskId) {
      // const taskId = node.getAttribute("data-task-id");
      const allTaskElements = document.querySelectorAll(
        `[data-task-id='${taskId}']`
      );
      allTaskElements.forEach((el) => el.remove());
    };
    const getModalInput = function (node) {
      const getName = function () {
        return node.querySelector(".task-name").value;
      };
      const getDescription = function () {
        return node.querySelector(".task-description").value;
      };
      const getDate = function () {
        const date = node.querySelector(".task-date").value;
        const dateArr = date.split("-");
        const numberDateArr = dateArr.map((string) => Number(string));
        return numberDateArr;
      };
      const getPriority = function () {
        const checkedEl = node.querySelector(".checked-priority");
        const classArr = Array.from(checkedEl.classList);

        return classArr[1];
      };
      const getProject = function () {
        return node.querySelector(".task-description").value;
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
