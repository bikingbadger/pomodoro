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
    item-key="id"
    handle=".handle"
  >
    <template #item="{ element }">
      <li>
        <i class="pi pi-bars handle"></i>
        <div class="list-bullet" @click="completeTask(element)"></div>
        <span aria-hidden="true" v-html="formattedDescription(element.description)"></span>
        <div class="task-project">{{ projectName(element.projectId) }}</div>
      </li>
    </template>
  </vue-draggable>
  <todoist-tasks />
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import MarkdownIt from 'markdown-it';
import VueDraggable from 'vuedraggable';
import TodoistTasks from '@/components/tasks/TodoistTasks.vue';

export default {
  // order: 5,
  components: {
    VueDraggable,
    TodoistTasks,
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

    // Project Info
    const projectName = (sourceId) => store.getters.getProjectById(sourceId);

    return {
      drag,
      list,
      // Computed
      tasks,
      projectName,
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
  position: relative;
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

.task-project {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: x-small;
  padding-bottom: 0.5rem;
}
</style>
