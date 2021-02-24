import axios from 'axios';

const allTaskURL = 'https://api.todoist.com/rest/v1/tasks?filter=today';
const todoistKey = process.env.VUE_APP_TODOISTKEY;
export default {
  getTodoistTasks({ commit }) {
    console.log(todoistKey);
    axios
      .get(allTaskURL, { data: {}, headers: { Authorization: `Bearer ${todoistKey}` } })
      .then((response) => {
        commit('addTasks', response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
