const newTask = function (name) {
  const task = {
    name: name,
  };
  return task;
};

const addClickListener = function () {
  this.addEventListener("click", function () {});
};

export { newTask, addClickListener };
