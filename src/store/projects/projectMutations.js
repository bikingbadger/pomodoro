export default {
  addProjects(state, projects) {
    if (!projects) return;

    // Loop through projects and add any new one
    projects.forEach((project) => {
      const projectInList = state.projects
        ? state.projects.find((element) => element.sourceId === project.id)
        : undefined;

      if (!projectInList) {
        console.log(project);
        state.projects.push({
          id: state.projects.length,
          sourceId: project.id,
          name: project.name,
          parentId: project.parent_id,
        });
      }
    });
  },
};
