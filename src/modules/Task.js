export default class Task {
  constructor(
    title,
    description = "No description.",
    priority = "No priority added.",
    dueDate = "No date added."
  ) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
  }
  taskName() {
    console.log(this.title);
  }
}
