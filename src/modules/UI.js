class UI {
  static addEventListeners = function () {
    addBtn = document.querySelector("#add-button");
    profileBtn = document.querySelector("#profile-button");
    settingsBtn = document.querySelector("#settings-button");

    addBtn.addEventListener("click", UI.openModal());
  };
  static openModal = function () {
    const taskInputModal = document.querySelector("#task-input-modal");
    taskInputModal.setAttribute("hidden");
  };
  static closeModal = function () {
    const taskInputModal = document.querySelector("#task-input-modal");
    taskInputModal.removeAttribute("hidden");
  };
  static getInputModal = function () {};

  static populateTasks = function () {
    const div = document.createElement("div");
    const form = document.createElement("form");
    const p = document.createElement("p");
  };
}
