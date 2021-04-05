<template>
  <li :style="task.storeStyle">
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
</template>

<script>
import { useStore } from 'vuex';
import MarkdownIt from 'markdown-it';

export default {
  props: ['task'],
  setup() {
    const store = useStore();

    // Task data from store
    const completeTask = (task) => store.dispatch('completeTask', task);

    // Project Info
    const projectName = (sourceId) => store.getters.getProjectById(sourceId);

    const formattedDescription = (description) => {
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
    };

    return {
      formattedDescription,
      projectName,
      completeTask,
    };
  },
};
</script>

<style>
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
