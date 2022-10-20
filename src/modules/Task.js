export default class Task {
  constructor(
    name,
    description = "No description.",
    priority = "No priority added.",
    date = "No date added.",
    project = "No project added",
    id = "No id"
  ) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.date = date;
    this.project = project;
    this.id = id;
  }
  taskName() {
    console.log(this.title);
  }
}
