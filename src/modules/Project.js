export default class Project {
  static projectList = [];
  static addNewProject = function (projectName) {
    Project.projectList.push(projectName);
  };
}
