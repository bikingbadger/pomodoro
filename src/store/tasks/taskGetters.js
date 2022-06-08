export default {
  allTasks: (state) => state.tasks,
  filterTasks: (state) => (listName) => state.tasks.filter((task) => task.list === listName),
};
