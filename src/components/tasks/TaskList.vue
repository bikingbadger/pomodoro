<template>
  <vue-draggable
    class="task-list"
    tag="transition-group"
    :component-data="{
      tag: 'ul',
      type: 'transition-group',
      name: !drag ? 'flip-list' : null,
    }"
    v-model="tasks"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
    item-key="order"
    handle=".handle"
  >
    <template #item="{ element }">
      <li>
        <i class="pi pi-bars handle"></i>
        <div class="list-bullet" @click="completeTask(element)"></div>
        <span aria-hidden="true" v-html="formattedDescription(element.description)"></span>
      </li>
    </template>
  </vue-draggable>
  <!-- <pre>TODOIST: {{ todoistTasks }}</pre> -->
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import MarkdownIt from 'markdown-it';
import VueDraggable from 'vuedraggable';
import Todoist from '@/utilities/todoist';
import axios from 'axios';
import useSWRV from 'swrv';

function fetcher(url) {
  return axios
    .get(url, { data: {}, headers: { Authorization: `Bearer ${Todoist.todoistKey}` } })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
    });
}

export default {
  // order: 5,
  components: {
    VueDraggable,
  },
  setup() {
    const store = useStore();

    // Vue dragable setup
    const drag = ref(false);
    const list = ref([]);

    // Task data from store
    const completeTask = (task) => store.dispatch('completeTask', task);
    const tasks = computed({
      get: () => store.getters.allTasks,
      set: (listItem) => {
        store.dispatch('organiseTaskList', listItem);
      },
    });
    const addTasks = (newTasks) => store.dispatch('addTasks', { source: 'Todoist', tasks: newTasks });

    // Get todoist data
    const { data: todoistTasks, error: taskError } = useSWRV(Todoist.allTaskURL, fetcher);

    watch(todoistTasks, () => {
      addTasks(todoistTasks.value);
    });

    return {
      taskError,
      drag,
      list,
      // Computed
      tasks,
      // Methods
      completeTask,
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    },
  },
  methods: {
    formattedDescription(description) {
      const md = new MarkdownIt({ html: true, linkify: true, typographer: true });
      let renderedHTML = md.render(description);

      // This will take the links and open them in a new tab
      // so that the application will still continue running
      // and not replace it with the link
      const hasLinks = renderedHTML.indexOf('href');
      if (hasLinks > 0) {
        renderedHTML = renderedHTML.replace('href', 'target="_blank" href');
      }

      return renderedHTML;
    },
  },
};
</script>

<style scoped>
.task-list {
  border-radius: 1rem;
  padding: 1rem;
  margin-top: 1rem;
  list-style-type: none;
}

li {
  padding: 0.5em 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid blue;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr, 5fr;
  align-items: center;
  justify-content: start;
  cursor: pointer;
}

.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
}

.list-bullet {
  content: '';
  border-color: blue;
  border-style: solid;
  height: 20px;
  width: 20px;
  margin: 1rem;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
}

.task-complete:hover {
  cursor: pointer;
}
</style>
