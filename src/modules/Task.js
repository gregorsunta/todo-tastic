export default class Task {
  constructor(
    name,
    description = "No description.",
    priority = undefined,
    date = "No date added.",
    project = "No project added",
    id = "No id",
    done = false
  ) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.date = date;
    this.project = project;
    this.id = id;
    this.done = done;
  }
  taskName() {
    console.log(this.title);
  }
}
