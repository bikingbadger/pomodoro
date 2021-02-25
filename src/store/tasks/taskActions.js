import axios from 'axios';

const allTaskURL = 'https://api.todoist.com/rest/v1/tasks?filter=today';

const todoistKey = process.env.VUE_APP_TODOISTKEY;

export default {
  getTodoistTasks({ commit }) {
    axios
      .get(allTaskURL, { data: {}, headers: { Authorization: `Bearer ${todoistKey}` } })
      .then((response) => {
        commit('addTasks', response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  async completeTask({ commit }, task) {
    console.log(task);

    const completeTaskURL = `https://api.todoist.com/rest/v1/tasks/${task.sourceId}/close`;
    // axios
    //   .post(completeTaskURL, { data: {}, headers: { Authorization: `Bearer ${todoistKey}` } })
    //   .then((response) => {
    //     console.log(response);
    //     commit('completeTask', task);
    //     // commit('addTasks', response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    const response = await fetch(completeTaskURL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${todoistKey}` },
    });
    if (response.ok) {
      commit('completeTask', task);
    }

    console.log(response);
  },
};
