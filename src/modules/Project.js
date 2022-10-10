export default class Project {
  static projectList = [];
  static addNewProject = function (projectName) {
    projectList.push(projectName);
  };
}
