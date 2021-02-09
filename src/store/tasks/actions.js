import axios from 'axios';

const allTaskURL = 'https://api.todoist.com/rest/v1/tasks?filter=today';
const todoistKey = '1';
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

    // console.log(todoistKey);
    // const response = await fetch(allTaskURL, {
    //   headers: { Authorization: `Bearer ${todoistKey}` },
    // });
    // // console.log(response);
    // return await response.json();
  },
};
