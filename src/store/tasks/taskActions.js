// import axios from 'axios';

// const allTaskURL = 'https://api.todoist.com/rest/v1/tasks?filter=today';

const todoistKey = process.env.VUE_APP_TODOISTKEY;

export default {
  // getTodoistTasks({ commit }) {
  //   axios
  //     .get(allTaskURL, { data: {}, headers: { Authorization: `Bearer ${todoistKey}` } })
  //     .then((response) => {
  //       commit('addTasks', response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // },
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
  organiseTaskList({ commit }, taskList) {
    commit('organiseTaskList', taskList);
  },
};
