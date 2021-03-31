export default {
  getProjectById: (state) => (sourceId) => {
    // console.log(sourceId, state.projects);
    const projectInList = state.projects.find((project) => project.sourceId === sourceId);
    // console.log(projectInList);
    return projectInList.name;
  },
};
