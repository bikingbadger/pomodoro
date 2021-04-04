<script>
import { watch } from 'vue';
import { useStore } from 'vuex';
import useSWRV from 'swrv';
import axios from 'axios';

export default {
  setup() {
    const store = useStore();
    const allTaskURL = 'https://api.todoist.com/rest/v1/tasks?filter=today';
    const allProjectsURL = 'https://api.todoist.com/rest/v1/projects';
    const todoistKey = process.env.VUE_APP_TODOISTKEY;

    function fetcher(url) {
      return axios
        .get(url, { data: {}, headers: { Authorization: `Bearer ${todoistKey}` } })
        .then((response) => response.data)
        .catch((error) => {
          console.error(error);
        });
    }

    const addTasks = (newTasks) =>
      store.dispatch('addTasks', { source: 'Todoist', tasks: newTasks });

    const addProjects = (newProjects) => store.dispatch('addProjects', newProjects);

    // Get todoist data
    const { data: todoistTasks, error: taskError } = useSWRV(allTaskURL, fetcher);
    // Get todoist projects
    const { data: todoistProjects, error: projectsError } = useSWRV(allProjectsURL, fetcher);

    watch(todoistTasks, () => {
      addTasks(todoistTasks.value);
    });

    watch(todoistProjects, () => {
      addProjects(todoistProjects.value);
    });

    return {
      allTaskURL,
      todoistKey,
      taskError,
      todoistProjects,
      projectsError,
    };
  },
};
</script>
