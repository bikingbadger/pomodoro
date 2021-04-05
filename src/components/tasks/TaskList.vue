<template>
  <ul>
    <li
      v-for="(task, index) in tasks"
      :key="task.id"
      draggable="true"
      @dragstart="startDrag($event, task)"
      @dragend="endDrag($event, task)"
      @dragover.prevent
      @dragenter.prevent
      @drop="onDrop($event, 1)"
      :style="task.storeStyle"
      :data-position="index"
    >
      <i class="pi pi-bars handle"></i>
      <div
        draggable="true"
        @dragstart.prevent.stop
        @dragend.prevent.stop
        class="list-bullet"
        @click="completeTask(task)"
      ></div>
      <span
        draggable="true"
        @dragstart.prevent.stop
        @dragend.prevent.stop
        aria-hidden="true"
        v-html="formattedDescription(task.description)"
      ></span>
      <div class="task-project">{{ projectName(task.projectId) }}</div>
    </li>
  </ul>
  <todoist-tasks />
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import MarkdownIt from 'markdown-it';
import TodoistTasks from '@/components/tasks/TodoistTasks.vue';

export default {
  // order: 5,
  components: {
    TodoistTasks,
  },
  setup() {
    const store = useStore();

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

    // Drag and drop functionality
    let startPosition = null;

    const findLiElement = (element) =>
      element.nodeName === 'LI' ? element : findLiElement(element.parentElement);

    const startDrag = (event, task) => {
      store.dispatch('setOpacity', { task, value: 0.4 });
      const listItem = findLiElement(event.target);
      startPosition = listItem.getAttribute('data-position');
    };

    const endDrag = (event, task) => {
      store.dispatch('setOpacity', { task, value: 1 });
      startPosition = null;
    };

    const onDrop = (event, list) => {
      const liEnd = findLiElement(event.toElement);
      const newPosition = liEnd.getAttribute('data-position');
      store.dispatch('moveTask', {
        list,
        startPosition,
        newPosition,
      });
    };

    return {
      // Computed
      tasks,
      projectName,
      // Methods
      completeTask,
      startDrag,
      endDrag,
      onDrop,
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
      if (!description) return null;
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
