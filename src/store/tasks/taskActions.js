const todoistKey = process.env.VUE_APP_TODOISTKEY;

export default {
  addTasks({ commit }, payload) {
    commit('addTasks', payload);
  },
  completeTask({ commit }, task) {
    if (!task) return;

    const completeTaskURL = `https://api.todoist.com/rest/v1/tasks/${task.sourceId}/close`;

    fetch(completeTaskURL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${todoistKey}` },
    });

    commit('completeTask', task);
  },
  moveTask({ commit }, taskToMove) {
    commit('moveTask', taskToMove);
  },
  organiseTaskList({ commit }, taskList) {
    commit('organiseTaskList', taskList);
  },
  setOpacity({ commit }, taskSelected) {
    commit('setOpacity', taskSelected);
  },
};
